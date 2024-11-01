import {IBook} from "../models/Book";
import {Types} from "mongoose";

export type CreateBookRequest = {
    title: string;
    author: string;
    publisher: string;
    publish_year: string;
    genre: string;
    isbn: string;
}

export type UpdateBookRequest = {
    title: string;
    author: string;
    publisher: string;
    publish_year: string;
    genre: string;
    isbn: string;
}

export type BookResponse = {
    _id: string;
    title: string;
    author: any;
    publisher: string;
    publish_year: string;
    genre: string;
    isbn: string;
    created_at: string;
    updated_at: string;
}

export function toBookResponse(book: IBook): BookResponse {
    return {
        _id: (book._id as Types.ObjectId).toString(),
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        publish_year: book.publish_year,
        genre: book.genre,
        isbn: book.isbn,
        created_at: (book.created_at as Date).toLocaleString(),
        updated_at: (book.updated_at as Date).toLocaleString()
    }
}

export function toAllBookResponses(books: IBook[]): BookResponse[] {
    const bookResponses: BookResponse[] = [];
    books.forEach((value) => {
        bookResponses.push(toBookResponse(value));
    });

    return bookResponses;
}