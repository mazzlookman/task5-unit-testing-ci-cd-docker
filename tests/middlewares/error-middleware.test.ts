import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { CustomErrors } from "../../src/exceptions/custom-errors";
import { ErrorMiddleware } from "../../src/middlewares/error-middleware";
import { validationErrorFormatter } from "../../src/formatters/validation-error-formatter";

describe("ErrorMiddleware", () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = {} as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        next = jest.fn();
    });

    it("returns 422 for ZodError", async () => {
        const err = new ZodError([]);
        await ErrorMiddleware(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            code: 422,
            status: "Unprocessable Entity",
            errors: validationErrorFormatter(err)
        });
    });

    it("returns custom error code and message for CustomErrors", async () => {
        const err = new CustomErrors(400, "Bad Request", "Invalid input");
        await ErrorMiddleware(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            code: 400,
            status: "Bad Request",
            errors: "Invalid input"
        });
    });

    it("returns 500 for generic errors", async () => {
        const err = new Error("Something went wrong");
        await ErrorMiddleware(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            code: 500,
            status: "Internal Server Error",
            errors: "Something went wrong"
        });
    });
});