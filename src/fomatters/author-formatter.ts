import {IAuthor} from "../models/Author";
import {Types} from "mongoose";

export type CreateAuthorRequest = {
    name: string;
    email: string;
    password: string;
    bio: string;
}

export type LoginAuthorRequest = {
    email: string;
    password: string;
}

export type AuthorResponse = {
    _id: string;
    name: string;
    email: string;
    bio: string;
    token?: string;
    created_at: string;
    updated_at: string;
}

export function toAuthorResponse(author: IAuthor): AuthorResponse {
    return {
        _id: (author._id as Types.ObjectId).toString(),
        name: author.name,
        email: author.email,
        bio: author.bio,
        created_at: (author.created_at as Date).toString(),
        updated_at: (author.updated_at as Date).toString()
    }
}