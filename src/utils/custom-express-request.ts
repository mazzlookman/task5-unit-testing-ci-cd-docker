import session from "express-session";
import {Request} from "express";

interface SessionData extends session.Session {
    author?: any;
}

export interface CustomRequest extends Request {
    session: SessionData;
}