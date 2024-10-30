import {z} from "zod";

export class AuthorValidation {
    static readonly REGISTER = z.object({
        name: z.string().min(3).max(255),
        email: z.string().min(3).max(255).email(),
        password: z.string().min(3).max(255),
        bio: z.string().min(3),
    })
}