import { Schema, model, Document, Types } from "mongoose";

export interface IAuthor extends Document {
    name: string;
    email: string;
    password: string;
    bio: string;
    created_at?: Date;
    updated_at?: Date;
}

const authorSchema = new Schema<IAuthor>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, required: true },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export const Author = model<IAuthor>('Author', authorSchema);