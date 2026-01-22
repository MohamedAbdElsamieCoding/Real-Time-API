import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { AppError } from "../utils/app-error.js";
import { httpStatusText } from "../utils/http-status-text.js";
import { Auth } from "../models/auth.model.js";
import { asyncHandler } from "./async-handler.js";

export const protect = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You are not logged in", httpStatusText.FAIL, 401),
      );
    }

    const decoded: any = verifyAccessToken(token);
    if (!decoded) {
      return next(
        new AppError("Invalid or expired token", httpStatusText.FAIL, 401),
      );
    }

    const currentUser = await Auth.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token no longer exists",
          httpStatusText.FAIL,
          401,
        ),
      );
    }

    req.user = currentUser;
    next();
  },
);
