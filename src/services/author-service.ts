import bcrypt from "bcrypt";
import {AuthorResponse, CreateAuthorRequest, toAuthorResponse} from "../fomatters/author-formatter";
import {Validation} from "../validations/schema";
import {AuthorValidation} from "../validations/author-validation";
import {Author} from "../models/Author";
import {CustomErrors} from "../exceptions/custom-errors";

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
}