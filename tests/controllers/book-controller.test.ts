import { BookController } from "../../src/controllers/book-controller";
import { BookService } from "../../src/services/book-service";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../../src/utils/custom-express-request";
import { JwtPayloadCustom } from "../../src/formatters/author-formatter";
import {BookMock} from "../utils/book-mock";

jest.mock("../../src/services/book-service");

describe("BookController", () => {
    let req: Partial<CustomRequest>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            session: { author: { _id: "authorId" } as JwtPayloadCustom },
            body: {},
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe("create", () => {
        it("creates a book successfully", async () => {
            const request = BookMock.CREATE_BOOK_REQUEST;
            req.body = request;
            const book = { id: "bookId", ...request };
            (BookService.create as jest.Mock).mockResolvedValue(book);

            await BookController.create(req as CustomRequest, res as Response, next);

            expect(BookService.create).toHaveBeenCalledWith("authorId", request);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: book }));
        });

        it("handles errors", async () => {
            const error = new Error("Error");
            (BookService.create as jest.Mock).mockRejectedValue(error);

            await BookController.create(req as CustomRequest, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("getAllBooks", () => {
        it("retrieves all books successfully", async () => {
            const books = [{ id: "bookId1" }, { id: "bookId2" }];
            (BookService.getAllBooks as jest.Mock).mockResolvedValue(books);

            await BookController.getAllBooks(req as Request, res as Response, next);

            expect(BookService.getAllBooks).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: books }));
        });

        it("handles errors", async () => {
            const error = new Error("Error");
            (BookService.getAllBooks as jest.Mock).mockRejectedValue(error);

            await BookController.getAllBooks(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("getById", () => {
        it("retrieves a book by id successfully", async () => {
            const book = { id: "bookId" };
            req.params.bookId = "bookId";
            (BookService.getById as jest.Mock).mockResolvedValue(book);

            await BookController.getById(req as Request, res as Response, next);

            expect(BookService.getById).toHaveBeenCalledWith("bookId");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: book }));
        });

        it("handles errors", async () => {
            const error = new Error("Error");
            (BookService.getById as jest.Mock).mockRejectedValue(error);

            await BookController.getById(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("update", () => {
        it("updates a book successfully", async () => {
            const request = BookMock.UPDATE_BOOK_REQUEST;
            req.body = request;
            req.params.bookId = "bookId";
            const book = { id: "bookId", ...request };
            (BookService.update as jest.Mock).mockResolvedValue(book);

            await BookController.update(req as CustomRequest, res as Response, next);

            expect(BookService.update).toHaveBeenCalledWith("bookId", "authorId", request);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: book }));
        });

        it("handles errors", async () => {
            const error = new Error("Error");
            (BookService.update as jest.Mock).mockRejectedValue(error);

            await BookController.update(req as CustomRequest, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("delete", () => {
        it("deletes a book successfully", async () => {
            req.params.bookId = "bookId";
            (BookService.delete as jest.Mock).mockResolvedValue(true);

            await BookController.delete(req as CustomRequest, res as Response, next);

            expect(BookService.delete).toHaveBeenCalledWith("bookId", "authorId");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: { is_deleted: true } }));
        });

        it("handles errors", async () => {
            const error = new Error("Error");
            (BookService.delete as jest.Mock).mockRejectedValue(error);

            await BookController.delete(req as CustomRequest, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
