import { Request, Response, NextFunction } from "express";
import {AuthorResponse, CreateAuthorRequest, LoginAuthorRequest} from "../fomatters/author-formatter";
import {AuthorService} from "../services/author-service";
import {CustomRequest} from "../utils/custom-express-request";

export class AuthorController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as CreateAuthorRequest;
            const author = await AuthorService.register(request);
            res.status(201).json(author);
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

            res.status(200).json(author);
        } catch (err) {
            next(err);
        }
    }

    static async getProfile(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const author = req.session.author as AuthorResponse;
            res.status(200).json(author);
        } catch (err) {
            next(err);
        }
    }
}