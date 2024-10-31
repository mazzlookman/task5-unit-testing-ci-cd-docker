import {CreateBook, toAllBookResponses, toBookResponse} from "../fomatters/book-formatter";
import {Book} from "../models/Book";
import {Validation} from "../validations/schema";
import {BookValidation} from "../validations/book-validation";
import {CustomErrors} from "../exceptions/custom-errors";

export class BookService {
    static async create(authorId: string, request: CreateBook) {
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
}