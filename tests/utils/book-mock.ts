import {
    BookResponse,
    CreateBookRequest,
    toAllBookResponses,
    toBookResponse,
    UpdateBookRequest
} from "../../src/formatters/book-formatter";
import {Book} from "../../src/models/Book";
import {AuthorServiceUtil} from "../../src/utils/author-service-util";

export class BookMock {
    static CREATE_BOOK_REQUEST: CreateBookRequest = {
        title: "New Book",
        author: "Author",
        publisher: "Publisher",
        publish_year: "2024",
        genre: "Fiction",
        isbn: "1234567890123",
    };

    static UPDATE_BOOK_REQUEST: UpdateBookRequest = {
        title: "New Book Updated",
        author: "Author",
        publisher: "Publisher",
        publish_year: "2024",
        genre: "Fiction",
        isbn: "1234567890123",
    };

    static BOOK_RESPONSE: BookResponse = {
        _id: "1",
        title: "New Book",
        author: {
            _id: "1",
            name: "Author",
            email: "author@test.com",
            bio: "Author bio",
        },
        publisher: "Publisher",
        publish_year: "2024",
        genre: "Fiction",
        isbn: "1234567890123",
        created_at: "2024-09-01T00:00:00.000Z",
        updated_at: "2024-09-01T00:00:00.000Z"
    }

    static findOneBook(): jest.Mock {
        return Book.findOne as jest.Mock;
    }

    static findBookById(): jest.Mock {
        return Book.findById as jest.Mock;
    }

    static findAllBooks(): jest.Mock {
        return Book.find as jest.Mock;
    }

    static findBookByIdAndUpdate(): jest.Mock {
        return Book.findByIdAndUpdate as jest.Mock;
    }

    static saveBook(): jest.Mock {
        return Book.prototype.save as jest.Mock;
    }

    static validateBookId(): jest.Mock {
        return AuthorServiceUtil.isValidObjectId as jest.Mock;
    }

    static trueAuthorOfBook(): jest.Mock {
        return AuthorServiceUtil.isAuthorOfBook as jest.Mock;
    }

    static toBookResponse(): jest.Mock {
        return toBookResponse as jest.Mock;
    }

    static toBookResponses(): jest.Mock {
        return toAllBookResponses as jest.Mock;
    }
}