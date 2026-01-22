import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";
import { AppError } from "../utils/app-error.js";
import { httpStatusText } from "../utils/http-status-text.js";

export const validate = (schema: ZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues
          .map((err) => `${err.path.join(".")} : ${err.message}`)
          .join(", ");
        return next(new AppError(message, httpStatusText.FAIL, 400));
      }
      return next(error);
    }
  };
};
