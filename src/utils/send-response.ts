import { Response } from "express";
import { ApiResponse } from "../types/api-response.js";
import { httpStatusText } from "./http-status-text.js";
import { IAuth } from "../types/auth.js";
import { generateAccessToken, generateRefreshToken } from "./jwt.js";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
  meta?: Record<string, unknown>,
): Response => {
  const body: ApiResponse<T> = {
    status:
      statusCode < 400
        ? httpStatusText.SUCCESS
        : statusCode < 500
          ? httpStatusText.FAIL
          : httpStatusText.ERROR,
    message,
    data: data ?? null,
    ...(meta && { meta }),
  };
  return res.status(statusCode).json(body);
};

export const sendAuthResponse = async (
  res: Response,
  user: IAuth,
  statusCode: number,
  message: string,
) => {
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

  return sendResponse(res, statusCode, message, {
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
    accessToken,
  });
};
