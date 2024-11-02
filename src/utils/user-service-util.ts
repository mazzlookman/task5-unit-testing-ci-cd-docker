import {Types} from "mongoose";
import {CustomErrors} from "../exceptions/custom-errors";

export class UserServiceUtil {
    static isAuthorOfBookCheck(authorIdInBook: Types.ObjectId, authorId: string) {
        const trueAuthor = (authorIdInBook as Types.ObjectId).toString();
        if ( trueAuthor !== authorId) {
            throw new CustomErrors(403, 'Forbidden', `You're not author for this book`);
        }
    }

    static validObjectIdCheck(objectId: string) {
        if (!Types.ObjectId.isValid(objectId)) {
            throw new CustomErrors(400, 'Invalid ID', 'The book ID provided is not valid');
        }
    }
}