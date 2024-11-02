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
    access_token?: string;
    refresh_token?: string;
    created_at: string;
    updated_at: string;
    // in bellow, just for unit test
    password?: string;
}

export type JwtPayloadCustom = {
    _id: string,
    email: string
}

export function toAuthorResponse(author: IAuthor): AuthorResponse {
    return {
        _id: (author._id as Types.ObjectId).toString(),
        name: author.name,
        email: author.email,
        bio: author.bio,
        created_at: (author.created_at as Date).toLocaleString(),
        updated_at: (author.updated_at as Date).toLocaleString()
    }
}