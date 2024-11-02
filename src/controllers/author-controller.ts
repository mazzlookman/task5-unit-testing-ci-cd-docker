import { Request, Response, NextFunction } from "express";
import {CreateAuthorRequest, JwtPayloadCustom, LoginAuthorRequest} from "../formatters/author-formatter";
import {AuthorService} from "../services/author-service";
import {CustomRequest} from "../utils/custom-express-request";
import {toAPIResponse} from "../formatters/api-response";

export class AuthorController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as CreateAuthorRequest;
            const author = await AuthorService.register(request);
            res.status(201).json(toAPIResponse(201, 'Created', author));
        } catch (err) {
            next(err);
        }
    }

    static async login(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const request = req.body as LoginAuthorRequest;
            const author = await AuthorService.login(request);

            // save refresh token in http-only cookie
            res.cookie('refresh_token', author.refresh_token, {
                httpOnly: true,
                secure: false
            });

            // save too in session
            req.session.author = author;

            res.status(200).json(toAPIResponse(201, 'OK', author));
        } catch (err) {
            next(err);
        }
    }

    static async getProfile(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const sessionData = req.session.author as JwtPayloadCustom;

            const author = await AuthorService.getProfile(sessionData._id);
            res.status(200).json(toAPIResponse(200, 'OK', author));
        } catch (err) {
            next(err);
        }
    }
}