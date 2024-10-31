import { Schema, model, Document, Types } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: Types.ObjectId;
    publisher: string;
    publish_year: string;
    genre: string;
    isbn: string;
    created_at?: Date;
    updated_at?: Date;
}

const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    publisher: { type: String, required: true },
    publish_year: { type: String, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true , unique: true},
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export const Book = model<IBook>('Book', bookSchema);