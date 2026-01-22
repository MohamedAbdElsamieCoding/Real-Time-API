import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error.js";
import { httpStatusText } from "../utils/http-status-text.js";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = (err as AppError).statusCode || 500;
  const statusText = (err as AppError).statusText || httpStatusText.ERROR;
  console.log(
    `${req.id || `no id`} ${err.message}  , ${req.method} , ${
      req.originalUrl
    }\n${err.stack}`,
  );
  return res.status(statusCode).json({
    status: statusText,
    message: err.message || "Something went wrong",
  });
};
