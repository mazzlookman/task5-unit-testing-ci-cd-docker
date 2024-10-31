import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {CustomErrors} from "../exceptions/custom-errors";
import {CustomRequest} from "../utils/custom-express-request";
import {getEnv} from "../utils/env-value";

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, getEnv('SECRET_KEY'), (err, author) => {
            if (err) {
                throw new CustomErrors(403, 'Forbidden', err.message);
            }
            req.session.author = author;
            next();
        });
    } else {
        throw new CustomErrors(401, 'Unauthorized', 'Token not provided');
    }
}