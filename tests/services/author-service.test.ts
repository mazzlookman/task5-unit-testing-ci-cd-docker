import { AuthorService } from "../../src/services/author-service";
import { CustomErrors } from "../../src/exceptions/custom-errors";
import { AuthorMock } from "../utils/author-mock";

jest.mock("../../src/models/Author");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../src/utils/env-value");
jest.mock("../../src/formatters/author-formatter");

describe("AuthorService", () => {
    describe("register", () => {
        it("registers a new author successfully", async () => {
            const request = AuthorMock.REGISTER_AUTHOR_REQUEST;
            AuthorMock.findOneAuthor().mockResolvedValue(null);
            AuthorMock.hashPassword().mockResolvedValue("hashedPassword");
            AuthorMock.saveAuthor().mockResolvedValue({ _id: "1", email: "test@example.com", password: "hashedPassword" });

            AuthorMock.toAuthorResponse().mockReturnValue(AuthorMock.AUTHOR_RESPONSE);
            const response = await AuthorService.register(request);

            expect(response.email).toBe("author@test.com");
            expect(response.password).toBeUndefined();
        });

        it("throws an error if author already exists", async () => {
            const request = AuthorMock.REGISTER_AUTHOR_REQUEST;
            AuthorMock.findOneAuthor().mockResolvedValue({ email: "author@test.com" });

            await expect(AuthorService.register(request)).rejects.toThrow(CustomErrors);
        });
    });

    describe("login", () => {
        it("logs in an author successfully", async () => {
            const request = AuthorMock.LOGIN_AUTHOR_REQUEST;
            const author = AuthorMock.AUTHOR_RESPONSE;

            AuthorMock.findOneAuthor().mockResolvedValue(author);
            AuthorMock.hashComparePassword().mockResolvedValue(true);
            AuthorMock.getEnv().mockReturnValue("secret");
            AuthorMock.toAuthorResponse().mockReturnValue(author);
            AuthorMock.jwtSign().mockReturnValue("token");

            const response = await AuthorService.login(request);

            expect(response.email).toBe("author@test.com");
            expect(response.access_token).toBe("token");
            expect(response.refresh_token).toBe("token");
        });

        it("throws an error if email is wrong", async () => {
            const request = { email: "wrong@example.com", password: "password123" };
            AuthorMock.findOneAuthor().mockResolvedValue(null);

            await expect(AuthorService.login(request)).rejects.toThrow(CustomErrors);
        });

        it("throws an error if password is wrong", async () => {
            const request = { email: "author@test.com", password: "wrongpassword" };
            const author = AuthorMock.AUTHOR_RESPONSE;
            AuthorMock.findOneAuthor().mockResolvedValue(author);
            AuthorMock.hashComparePassword().mockResolvedValue(false);

            await expect(AuthorService.login(request)).rejects.toThrow(CustomErrors);
        });
    });

    describe("getProfile", () => {
        it("retrieves author profile successfully", async () => {
            const author = AuthorMock.AUTHOR_RESPONSE;
            AuthorMock.findAuthorById().mockResolvedValue(author);
            AuthorMock.toAuthorResponse().mockReturnValue(author);

            const response = await AuthorService.getProfile("1");
            expect(response.email).toBe("author@test.com");
        });

        it("throws an error if author not found", async () => {
            AuthorMock.findAuthorById().mockResolvedValue(null);

            await expect(AuthorService.getProfile("1")).rejects.toThrow(CustomErrors);
        });
    });
});
