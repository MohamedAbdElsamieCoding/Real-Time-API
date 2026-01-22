import { asyncHandler } from "../middlewares/async-handler.js";
import type { Request, Response, NextFunction } from "express";
import { Auth } from "../models/auth.model.js";
import { AppError } from "../utils/app-error.js";
import { httpStatusText } from "../utils/http-status-text.js";
import { sendAuthResponse, sendResponse } from "../utils/send-response.js";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt.js";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, userName, email, password } = req.body;

    if (!firstName || !lastName || !userName || !email || !password) {
      return next(
        new AppError("All fields are required", httpStatusText.FAIL, 400),
      );
    }

    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return next(
        new AppError("Email already registered", httpStatusText.FAIL, 409),
      );
    }

    const user = await Auth.create({
      firstName,
      lastName,
      userName,
      email,
      password,
    });

    await sendAuthResponse(res, user, 201, "User created successfully");
  },
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new AppError(
          "Email and password are required",
          httpStatusText.FAIL,
          400,
        ),
      );
    }

    const user = await Auth.findOne({ email }).select("+password");
    if (!user)
      return next(
        new AppError("Invalid email or password", httpStatusText.FAIL, 401),
      );

    const comparedPassword = await user.comparePassword(password);
    if (!comparedPassword) {
      return next(
        new AppError("Invalid email or password", httpStatusText.FAIL, 401),
      );
    }

    await sendAuthResponse(res, user, 200, "Login successful");
  },
);

export const refreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return next(
        new AppError("Refresh token not found", httpStatusText.FAIL, 401),
      );
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded)
      return next(
        new AppError(
          "Invalid or expired refresh token",
          httpStatusText.FAIL,
          401,
        ),
      );
    const user = await Auth.findById(decoded.id).select("+refreshToken");
    if (!user || user.refreshToken !== refreshToken)
      return next(
        new AppError("Invalid refresh token", httpStatusText.FAIL, 401),
      );
    const accessToken = generateAccessToken(user._id.toString());
    sendResponse(res, 200, "Token refreshed successfully", { accessToken });
  },
);

export const logout = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    res.clearCookie("refreshToken");
    sendResponse(res, 200, "Logged out successfully");
  },
);
