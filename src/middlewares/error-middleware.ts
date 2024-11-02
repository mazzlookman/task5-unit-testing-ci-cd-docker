import { Request, Response, NextFunction } from "express";
import {ZodError} from "zod";
import {CustomErrors} from "../exceptions/custom-errors";
import {validationErrorFormatter} from "../formatters/validation-error-formatter";

export const ErrorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        res.status(422).json({
            code: 422,
            status: "Unprocessable Entity",
            errors: validationErrorFormatter(err)
        });
    } else if (err instanceof CustomErrors) {
        res.status(err.code).json({
            code: err.code,
            status: err.status,
            errors: err.message
        });
    } else {
        res.status(500).json({
            code: 500,
            status: "Internal Server Error",
            errors: err.message
        });
    }
}