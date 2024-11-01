import {CreateBookRequest, toAllBookResponses, toBookResponse, UpdateBookRequest} from "../fomatters/book-formatter";
import {Book, IBook} from "../models/Book";
import {Validation} from "../validations/schema";
import {BookValidation} from "../validations/book-validation";
import {CustomErrors} from "../exceptions/custom-errors";
import {Types} from "mongoose";

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
        if (!Types.ObjectId.isValid(bookId)) {
            throw new CustomErrors(400, 'Invalid ID', 'The book ID provided is not valid');
        }

        const book = await Book.findById(bookId);
        if (!book) {
            throw new CustomErrors(404, 'Not Found', 'Book not found');
        }
        return toBookResponse(book);
    }

    static async update(bookId: string, request: UpdateBookRequest) {
        if (!Types.ObjectId.isValid(bookId)) {
            throw new CustomErrors(400, 'Invalid ID', 'The book ID provided is not valid');
        }

        const bookRequest = Validation.validate(BookValidation.UPDATE, request);
        const bookBefore = await Book.findById(bookId);
        if (!bookBefore) {
            throw new CustomErrors(404, 'Not Found', 'Book not found');
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

    static async delete(bookId: string) {
        if (!Types.ObjectId.isValid(bookId)) {
            throw new CustomErrors(400, 'Invalid ID', 'The book ID provided is not valid');
        }

        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            throw new CustomErrors(404, 'Not Found', 'Book not found');
        }

        return true
    }
}