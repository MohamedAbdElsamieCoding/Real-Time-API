import { asyncHandler } from "../middlewares/async-handler";
import type { Request, Response, NextFunction } from "express";
import { Auth } from "../models/auth.model";
import { AppError } from "../utils/app-error";
import { httpStatusText } from "../utils/http-status-text";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { sendResponse } from "../utils/send-response";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, userName, email, password } = req.body;
    if (!firstName || !lastName || !userName || !email || !password)
      return next(
        new AppError("Fields are required", httpStatusText.ERROR, 404)
      );

    const existingUser = await Auth.findOne({ email });
    if (existingUser)
      return next(
        new AppError("Email already registered", httpStatusText.FAIL, 409)
      );
    const user = await Auth.create({
      firstName,
      lastName,
      userName,
      email,
      password,
    });

    // Generate Tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    sendResponse(res, 200, "User created successfully", {
      accessToken: accessToken,
      user: { id: user._id, userName: user.userName, email: user.email },
    });
  }
);
