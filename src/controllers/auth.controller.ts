import { asyncHandler } from "../middlewares/async-handler";
import type { Request, Response, NextFunction } from "express";
import { Auth } from "../models/auth.model";
import { AppError } from "../utils/app-error";
import { httpStatusText } from "../utils/http-status-text";
import { sendAuthResponse } from "../utils/send-response";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, userName, email, password } = req.body;

    if (!firstName || !lastName || !userName || !email || !password) {
      return next(
        new AppError("All fields are required", httpStatusText.FAIL, 400)
      );
    }

    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return next(
        new AppError("Email already registered", httpStatusText.FAIL, 409)
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
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new AppError(
          "Email and password are required",
          httpStatusText.FAIL,
          400
        )
      );
    }

    const user = await Auth.findOne({ email }).select("+password");
    if (!user)
      return next(
        new AppError("Invalid email or password", httpStatusText.FAIL, 401)
      );

    const comparedPassword = await user.comparePassword(password);
    if (!comparedPassword) {
      return next(
        new AppError("Invalid email or password", httpStatusText.FAIL, 401)
      );
    }

    await sendAuthResponse(res, user, 200, "Login successful");
  }
);
