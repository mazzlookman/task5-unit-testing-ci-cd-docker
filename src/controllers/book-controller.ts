import { Request, Response, NextFunction } from "express";
import {CustomRequest} from "../utils/custom-express-request";
import {BookService} from "../services/book-service";
import {CreateBook} from "../fomatters/book-formatter";
import {toAPIResponse} from "../fomatters/api-response";

export class BookController {
    static async create(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const authorId = req.session.author._id;
            const request = req.body as CreateBook;

            const book = await BookService.create(authorId, request);
            res.status(201).json(toAPIResponse(201, 'Created', book));
        } catch (e) {
            next(e);
        }
    }

    static async getAllBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const books = await BookService.getAllBooks();
            res.status(200).json(toAPIResponse(200, 'OK', books));
        } catch (e) {
            next(e);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const book = await BookService.getById(req.params.bookId);
            res.status(200).json(toAPIResponse(200, 'OK', book));
        } catch (e) {
            next(e);
        }
    }
}