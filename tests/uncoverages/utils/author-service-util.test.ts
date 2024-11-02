import { AuthorServiceUtil } from '../../../src/utils/author-service-util';
import { Types } from 'mongoose';

describe('AuthorServiceUtil', () => {
    describe('isAuthorOfBook', () => {
        it('should return true if authorId matches authorIdInBook', () => {
            const authorIdInBook = new Types.ObjectId('507f1f77bcf86cd799439011');
            const authorId = '507f1f77bcf86cd799439011';
            const result = AuthorServiceUtil.isAuthorOfBook(authorIdInBook, authorId);
            expect(result).toBe(true);
        });

        it('should return false if authorId does not match authorIdInBook', () => {
            const authorIdInBook = new Types.ObjectId('507f1f77bcf86cd799439011');
            const authorId = '507f1f77bcf86cd799439012';
            const result = AuthorServiceUtil.isAuthorOfBook(authorIdInBook, authorId);
            expect(result).toBe(false);
        });
    });

    describe('isValidObjectId', () => {
        it('should return true for a valid ObjectId', () => {
            const objectId = '507f1f77bcf86cd799439011';
            const result = AuthorServiceUtil.isValidObjectId(objectId);
            expect(result).toBe(true);
        });

        it('should return false for an invalid ObjectId', () => {
            const objectId = 'invalidObjectId';
            const result = AuthorServiceUtil.isValidObjectId(objectId);
            expect(result).toBe(false);
        });
    });
});
