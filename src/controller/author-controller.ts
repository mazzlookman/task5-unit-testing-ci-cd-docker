import { Request, Response, NextFunction } from "express";
import {CreateAuthorRequest} from "../fomatters/author-formatter";
import {AuthorService} from "../services/author-service";

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
}