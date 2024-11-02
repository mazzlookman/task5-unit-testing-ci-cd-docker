import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {CustomErrors} from "../exceptions/custom-errors";
import {CustomRequest} from "../utils/custom-express-request";
import {getEnv} from "../utils/env-value";

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new CustomErrors(401, "Unauthorized", "Token not provided or invalid format"));
    }

    const token = authHeader.split(' ')[1];
    if (token) {
        jwt.verify(token, getEnv('SECRET_KEY'), (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return next(new CustomErrors(403, "Forbidden", "Token expired"));
                } else if (err.name === 'JsonWebTokenError') {
                    return next(new CustomErrors(403, "Forbidden", "Invalid token"));
                }
                return next(new CustomErrors(403, "Forbidden", "Token verification failed"));
            }
            req.session.author = decoded;
            next();
        });
    }
}