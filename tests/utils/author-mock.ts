import {
    AuthorResponse,
    CreateAuthorRequest,
    LoginAuthorRequest,
    toAuthorResponse
} from "../../src/formatters/author-formatter";
import {Author} from "../../src/models/Author";
// @ts-ignore
import bcrypt from "bcrypt";
// @ts-ignore
import jwt from "jsonwebtoken";
import {getEnv} from "../../src/utils/env-value";

export class AuthorMock {
    static REGISTER_AUTHOR_REQUEST: CreateAuthorRequest = {
        name: "Author",
        email: "author@test.com",
        password: "password123",
        bio: "Author bio",
    }

    static LOGIN_AUTHOR_REQUEST: LoginAuthorRequest = {
        email: "author@test.com",
        password: "password123",
    }

    static AUTHOR_RESPONSE: AuthorResponse = {
        _id: "1",
        name: "Author",
        email: "author@test.com",
        bio: "Author bio",
        password: undefined,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString()
    }

    static findOneAuthor(): jest.Mock {
        return Author.findOne as jest.Mock;
    }

    static findAuthorById(): jest.Mock {
        return Author.findById as jest.Mock;
    }
    static saveAuthor(): jest.Mock {
        return Author.prototype.save as jest.Mock;
    }

    static hashPassword(): jest.Mock {
        return bcrypt.hash as jest.Mock;
    }

    static hashComparePassword(): jest.Mock {
        return bcrypt.compare as jest.Mock;
    }

    static toAuthorResponse(): jest.Mock {
        return toAuthorResponse as jest.Mock
    }

    static getEnv(): jest.Mock {
        return getEnv as jest.Mock
    }

    static jwtSign(): jest.Mock {
        return jwt.sign as jest.Mock
    }
}