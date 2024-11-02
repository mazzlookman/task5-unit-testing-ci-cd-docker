import { toAuthorResponse } from '../../../src/formatters/author-formatter';
import { IAuthor } from '../../../src/models/Author';
import { Types } from 'mongoose';

describe('toAuthorResponse', () => {
    it('should convert IAuthor to AuthorResponse correctly', () => {
        // @ts-ignore
        const author: IAuthor = {
            _id: new Types.ObjectId(),
            name: 'John Doe',
            email: 'john.doe@example.com',
            bio: 'An experienced author',
            created_at: new Date('2023-01-01T00:00:00Z'),
            updated_at: new Date('2023-01-02T00:00:00Z'),
            password: 'password123' // for unit test purpose
        };

        const expectedResponse = {
            _id: author._id.toString(),
            name: author.name,
            email: author.email,
            bio: author.bio,
            created_at: author.created_at.toLocaleString(),
            updated_at: author.updated_at.toLocaleString()
        };

        const result = toAuthorResponse(author);

        expect(result).toEqual(expectedResponse);
    });
});