import { Response } from "express";
import { ApiResponse } from "../types/api-response";
import { httpStatusText } from "./http-status-text";
export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
  meta?: Record<string, unknown>
): Response => {
  const body: ApiResponse<T> = {
    status: statusCode < 400 ? httpStatusText.SUCCESS : httpStatusText.ERROR,
    message,
    data: data ?? null,
    ...(meta && { meta }),
  };
  return res.status(statusCode).json(body);
};
