import {z} from "zod";

export class BookValidation {

    static CREATE = z.object({
        title: z.string().min(3),
        publisher: z.string().min(3),
        publish_year: z.string().min(4),
        genre: z.string().min(3),
        isbn: z.string().min(13),
    });

    static UPDATE = z.object({
        title: z.string().min(3),
        author: z.string().min(3).optional(),
        publisher: z.string().min(3).optional(),
        publish_year: z.string().min(4).optional(),
        genre: z.string().min(3).optional(),
        isbn: z.string().min(13).optional(),
    });
}