import {CreateBookRequest, toAllBookResponses, toBookResponse, UpdateBookRequest} from "../formatters/book-formatter";
import {Book, IBook} from "../models/Book";
import {Validation} from "../validations/schema";
import {BookValidation} from "../validations/book-validation";
import {CustomErrors} from "../exceptions/custom-errors";
import {Types} from "mongoose";
import {AuthorServiceUtil} from "../utils/author-service-util";

export class BookService {
    static async create(authorId: string, request: CreateBookRequest) {
        const bookRequest = Validation.validate(BookValidation.CREATE, request);
        bookRequest.author = authorId;

        const book = await Book.findOne({ isbn: bookRequest.isbn })
        if (book) {
            throw new CustomErrors(409, 'Conflict', 'Are you sure that this book is your original work?');
        }
        return toBookResponse(await new Book(bookRequest).save());
    }

    static async getAllBooks() {
        const books = await Book.find({}).populate('author', 'name email bio');
        return toAllBookResponses(books);
    }

    static async getById(bookId: string) {
        // check if objectId is valid ?
        const validBookId = AuthorServiceUtil.isValidObjectId(bookId);
        if (!validBookId) {
            throw new CustomErrors(400, 'Bad Request', 'Invalid book id');
        }

        const book = await Book.findById(bookId).populate('author', 'name email bio');
        if (!book) {
            throw new CustomErrors(404, 'Not Found', 'Book not found');
        }
        return toBookResponse(book);
    }

    static async update(bookId: string, authorId: string, request: UpdateBookRequest) {
        // check if objectId is valid ?
        const validBookId = AuthorServiceUtil.isValidObjectId(bookId);
        if (!validBookId) {
            throw new CustomErrors(400, 'Bad Request', 'Invalid book id');
        }

        const bookRequest = Validation.validate(BookValidation.UPDATE, request);
        const bookBefore = await Book.findById(bookId).populate('author', '_id');

        // if book not found
        if (!bookBefore) {
            throw new CustomErrors(404, 'Not Found', 'Book not found');
        }

        // Check if the author is currently the owner of the book?
        const isAuthor = AuthorServiceUtil.isAuthorOfBook(bookBefore!.author._id, authorId);
        if (!isAuthor) {
            throw new CustomErrors(403, 'Forbidden', `You are not the owner of this book`);
        }

        const updateData: Partial<IBook> = {};
        if (bookRequest.title) updateData.title = bookRequest.title;
        if (bookRequest.author) updateData.author = (bookRequest.author as unknown) as Types.ObjectId;
        if (bookRequest.publisher) updateData.publisher = bookRequest.publisher;
        if (bookRequest.publish_year) updateData.publish_year = bookRequest.publish_year;
        if (bookRequest.genre) updateData.genre = bookRequest.genre;
        if (bookRequest.isbn) updateData.isbn = bookRequest.isbn;

        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { $set: updateData },
            { new: true }
        );

        return toBookResponse(updatedBook!);
    }

    static async delete(bookId: string, authorId: string) {
        AuthorServiceUtil.isValidObjectId(bookId);

        const bookBeforeDeleted = await Book.findById(bookId).populate('author', '_id');
        if (!bookBeforeDeleted) {
            throw new CustomErrors(404, 'Not Found', 'Book not found');
        }

        const isAuthor = AuthorServiceUtil.isAuthorOfBook(bookBeforeDeleted.author._id, authorId);
        if (!isAuthor) {
            throw new CustomErrors(403, 'Forbidden', `You are not the owner of this book`);
        }

        // delete the book
        await Book.deleteOne({ _id: bookId });

        return true
    }
}