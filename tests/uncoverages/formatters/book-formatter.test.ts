import { toBookResponse, toAllBookResponses } from '../../../src/formatters/book-formatter';
import { IBook } from '../../../src/models/Book';
import { Types } from 'mongoose';

describe('Book Formatter', () => {
    it('should convert IBook to BookResponse correctly', () => {
        // @ts-ignore
        const book: IBook = {
            _id: new Types.ObjectId(),
            title: 'Sample Book',
            author: new Types.ObjectId(),
            publisher: 'Publisher Name',
            publish_year: '2023',
            genre: 'Fiction',
            isbn: '123-4567890123',
            created_at: new Date('2023-01-01T00:00:00Z'),
            updated_at: new Date('2023-01-02T00:00:00Z')
        };

        const expectedResponse = {
            _id: book._id.toString(),
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            publish_year: book.publish_year,
            genre: book.genre,
            isbn: book.isbn,
            created_at: book.created_at.toLocaleString(),
            updated_at: book.updated_at.toLocaleString()
        };

        const result = toBookResponse(book);

        expect(result).toEqual(expectedResponse);
    });

    it('should convert an array of IBook to an array of BookResponse correctly', () => {
        // @ts-ignore
        const books: IBook[] = [
            {
                _id: new Types.ObjectId(),
                title: 'Sample Book 1',
                // @ts-ignore
                author: 'Author Name 1',
                publisher: 'Publisher Name 1',
                publish_year: '2023',
                genre: 'Fiction',
                isbn: '123-4567890123',
                created_at: new Date('2023-01-01T00:00:00Z'),
                updated_at: new Date('2023-01-02T00:00:00Z')
            },
            {
                _id: new Types.ObjectId(),
                title: 'Sample Book 2',
                // @ts-ignore
                author: 'Author Name 2',
                publisher: 'Publisher Name 2',
                publish_year: '2023',
                genre: 'Non-Fiction',
                isbn: '123-4567890124',
                created_at: new Date('2023-01-03T00:00:00Z'),
                updated_at: new Date('2023-01-04T00:00:00Z')
            }
        ];

        const expectedResponses = books.map(book => ({
            _id: book._id.toString(),
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            publish_year: book.publish_year,
            genre: book.genre,
            isbn: book.isbn,
            created_at: book.created_at.toLocaleString(),
            updated_at: book.updated_at.toLocaleString()
        }));

        const result = toAllBookResponses(books);

        expect(result).toEqual(expectedResponses);
    });
});
