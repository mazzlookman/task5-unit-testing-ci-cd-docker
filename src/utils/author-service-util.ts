import {Types} from "mongoose";
import {CustomErrors} from "../exceptions/custom-errors";

export class AuthorServiceUtil {
    static isAuthorOfBook(authorIdInBook: Types.ObjectId, authorId: string): boolean {
        const trueAuthor = (authorIdInBook as Types.ObjectId).toString();
        return trueAuthor === authorId;
    }

    static isValidObjectId(objectId: string): boolean {
        return Types.ObjectId.isValid(objectId);
    }
}