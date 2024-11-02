import bcrypt from "bcrypt";
import {
    AuthorResponse,
    CreateAuthorRequest,
    JwtPayloadCustom,
    LoginAuthorRequest,
    toAuthorResponse
} from "../formatters/author-formatter";
import {Validation} from "../validations/schema";
import {AuthorValidation} from "../validations/author-validation";
import {Author} from "../models/Author";
import {CustomErrors} from "../exceptions/custom-errors";
import jwt from "jsonwebtoken";
import {getEnv} from "../utils/env-value";

export class AuthorService {
    static async register(request: CreateAuthorRequest): Promise<AuthorResponse> {
        const authorRequest = Validation.validate(AuthorValidation.REGISTER, request);

        const findByEmail = await Author.findOne({
            email: authorRequest.email,
        });

        if (findByEmail) {
            throw new CustomErrors(409, "Conflict", 'Author already exists');
        }

        authorRequest.password = await bcrypt.hash(authorRequest.password, 10);

        const author = await new Author(authorRequest).save();

        return toAuthorResponse(author);
    }

    static async login(request: LoginAuthorRequest): Promise<AuthorResponse> {
        const { email, password } = Validation.validate(AuthorValidation.LOGIN, request);

        const author = await Author.findOne({ email: email });
        if (!author) {
            throw new CustomErrors(401, 'Unauthorized', 'Email or password is wrong');
        }

        const correctPassword = await bcrypt.compare(password, author!.password);
        if (!correctPassword) {
            throw new CustomErrors(401, 'Unauthorized', 'Email or password is wrong');
        }

        const response = toAuthorResponse(author);
        const jwtPayload: JwtPayloadCustom = {
            _id: response._id,
            email: response.email
        }

        const accessToken = jwt.sign(jwtPayload, getEnv('SECRET_KEY'), { expiresIn: '1d' });
        const refreshToken = jwt.sign(jwtPayload, getEnv('REFRESH_SECRET_KEY'), { expiresIn: '7d' });

        response.access_token = accessToken;
        response.refresh_token = refreshToken;

        return response;
    }

    static async getProfile(authorId: string) {
        const author = await Author.findById(authorId);
        if (!author) {
            throw new CustomErrors(404, 'Not Found', 'Author not found');
        }

        return toAuthorResponse(author);
    }
}