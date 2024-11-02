import { AuthorController } from "../../src/controllers/author-controller";
import { AuthorService } from "../../src/services/author-service";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../../src/utils/custom-express-request";
import { toAPIResponse } from "../../src/formatters/api-response";
import {JwtPayloadCustom} from "../../src/formatters/author-formatter";

jest.mock("../../src/services/author-service");
jest.mock("../../src/formatters/api-response");

describe("AuthorController", () => {
    let req: Partial<CustomRequest>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            body: {},
            session: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn()
        };
        next = jest.fn();
    });

    describe("register", () => {
        it("should register a new author and return 201 status", async () => {
            const mockAuthor = { id: "1", name: "Author" };
            (AuthorService.register as jest.Mock).mockResolvedValue(mockAuthor);
            (toAPIResponse as jest.Mock).mockReturnValue({ status: 201, message: "Created", data: mockAuthor });

            req.body = { name: "Author", email: "author@example.com", password: "password" };

            await AuthorController.register(req as Request, res as Response, next);

            expect(AuthorService.register).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ status: 201, message: "Created", data: mockAuthor });
        });

        it("should call next with an error if registration fails", async () => {
            const error = new Error("Registration failed");
            (AuthorService.register as jest.Mock).mockRejectedValue(error);

            await AuthorController.register(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("login", () => {
        it("should login an author and return 200 status", async () => {
            const mockAuthor = { id: "1", name: "Author", refresh_token: "token" };
            (AuthorService.login as jest.Mock).mockResolvedValue(mockAuthor);
            (toAPIResponse as jest.Mock).mockReturnValue({ status: 200, message: "OK", data: mockAuthor });

            req.body = { email: "author@example.com", password: "password" };

            await AuthorController.login(req as CustomRequest, res as Response, next);

            expect(AuthorService.login).toHaveBeenCalledWith(req.body);
            expect(res.cookie).toHaveBeenCalledWith("refresh_token", mockAuthor.refresh_token, { httpOnly: true, secure: false });
            expect(req.session.author).toEqual(mockAuthor);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: 200, message: "OK", data: mockAuthor });
        });

        it("should call next with an error if login fails", async () => {
            const error = new Error("Login failed");
            (AuthorService.login as jest.Mock).mockRejectedValue(error);

            await AuthorController.login(req as CustomRequest, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("getProfile", () => {
        it("should get author profile and return 200 status", async () => {
            const mockAuthor = { id: "1", name: "Author" };
            (AuthorService.getProfile as jest.Mock).mockResolvedValue(mockAuthor);
            (toAPIResponse as jest.Mock).mockReturnValue({ status: 200, message: "OK", data: mockAuthor });

            req.session.author = { _id: "1" } as JwtPayloadCustom;

            await AuthorController.getProfile(req as CustomRequest, res as Response, next);

            expect(AuthorService.getProfile).toHaveBeenCalledWith("1");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ status: 200, message: "OK", data: mockAuthor });
        });

        it("should call next with an error if getting profile fails", async () => {
            const error = new Error("Get profile failed");
            (AuthorService.getProfile as jest.Mock).mockRejectedValue(error);

            req.session.author = { _id: "1" } as JwtPayloadCustom;
            await AuthorController.getProfile(req as CustomRequest, res as Response, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
