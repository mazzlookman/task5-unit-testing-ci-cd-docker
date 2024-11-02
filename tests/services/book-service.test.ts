import { BookService } from '../../src/services/book-service';
import { CustomErrors } from '../../src/exceptions/custom-errors';
import {BookMock} from "../utils/book-mock";
import {AuthorServiceUtil} from "../../src/utils/author-service-util";

// mocks modules needed for testing
jest.mock('../../src/models/Book');
jest.mock('../../src/utils/author-service-util');
jest.mock('../../src/formatters/book-formatter');

// variables needed for testing
const createRequest = BookMock.CREATE_BOOK_REQUEST;
const updateRequest = BookMock.CREATE_BOOK_REQUEST;
const authorId = 'authorId';
const bookId = 'bookId';
const bookResponse = BookMock.BOOK_RESPONSE;

describe('BookService', () => {
    describe('create', () => {
        it('create a new book successfully', async () => {
            BookMock.findOneBook().mockResolvedValue(null);
            BookMock.saveBook().mockResolvedValue(bookResponse);
            BookMock.toBookResponse().mockReturnValue(bookResponse);

            const result = await BookService.create(authorId, createRequest);

            expect(result).toEqual(expect.objectContaining(bookResponse));
        });

        it('throws conflict error if book already exists', async () => {
            BookMock.findOneBook().mockResolvedValue(bookResponse);

            await expect(BookService.create(authorId, createRequest)).rejects.toThrow(CustomErrors);
        });
    });

    describe('getAllBooks', () => {
        it('returns all books', async () => {
            const books = { ...bookResponse };

            BookMock.findAllBooks().mockReturnValue({
                populate: jest.fn().mockResolvedValue(books),
            });

            BookMock.toBookResponses().mockReturnValue(books);

            const result = await BookService.getAllBooks();

            expect(result).toEqual(books);
        });
    });

    describe('getById', () => {
        it('returns book by id', async () => {
            BookMock.validateBookId().mockReturnValue(true);
            BookMock.findBookById().mockReturnValue({
                populate: jest.fn().mockResolvedValue(bookResponse),
            });

            BookMock.toBookResponse().mockReturnValue(bookResponse);
            const result = await BookService.getById(bookId);

            expect(result).toMatchObject(bookResponse);
        });

        it('throws invalid ID error for invalid bookId', async () => {
            const bookId = 'invalidId';
            BookMock.validateBookId().mockReturnValue(false);

            await expect(BookService.getById(bookId)).rejects.toThrow(CustomErrors);
        });

        it('throws not found error if book does not exist', async () => {
            const bookId = 'bookId';
            BookMock.findBookById().mockReturnValue({
                populate: jest.fn().mockResolvedValue(null),
            });

            await expect(BookService.getById(bookId)).rejects.toThrow(CustomErrors);
        });
    });

    describe('update', () => {
        it('updates a book successfully', async () => {
            BookMock.validateBookId().mockReturnValue(true);
            BookMock.findBookById().mockReturnValue({
                populate: jest.fn().mockResolvedValue(bookResponse),
            });

            BookMock.trueAuthorOfBook().mockReturnValue(true);
            BookMock.findBookByIdAndUpdate().mockResolvedValue(bookResponse);
            BookMock.toBookResponse().mockReturnValue(bookResponse);

            const result = await BookService.update(bookId, authorId, updateRequest);

            expect(result).toMatchObject(bookResponse);
        });

        it('throws not found error if book does not exist', async () => {
            BookMock.findBookById().mockReturnValue({
                populate: jest.fn().mockResolvedValue(null),
            });

            await expect(BookService.update(bookId, authorId, updateRequest)).rejects.toThrow(CustomErrors);
        });
    });

    describe('delete', () => {
        it('deletes a book successfully', async () => {
            BookMock.validateBookId().mockReturnValue(true);
            BookMock.findBookById().mockReturnValue({
                populate: jest.fn().mockResolvedValue(bookResponse),
            });
            BookMock.trueAuthorOfBook().mockReturnValue(true);

            const result = await BookService.delete(bookId, authorId);

            expect(result).toBe(true);
        });

        it('throws not found error if book does not exist', async () => {
            BookMock.findBookById().mockReturnValue({
                populate: jest.fn().mockResolvedValue(null),
            });

            await expect(BookService.delete(bookId, authorId)).rejects.toThrow(CustomErrors);
        });
    });
});

