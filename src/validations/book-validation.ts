import {z} from "zod";

export class BookValidation {

    static CREATE = z.object({
        title: z.string().min(3),
        publisher: z.string().min(3),
        publish_year: z.string().min(4),
        genre: z.string().min(3),
        isbn: z.string().min(13),
    });
}