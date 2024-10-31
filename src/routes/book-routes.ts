import express from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {BookController} from "../controllers/book-controller";

export const bookRoutes = express.Router();

bookRoutes.post('/books', authMiddleware, BookController.create);
bookRoutes.get('/books', BookController.getAllBooks);