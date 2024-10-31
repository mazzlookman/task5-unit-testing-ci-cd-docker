import express from "express";
import {AuthorController} from "../controllers/author-controller";
import {authMiddleware} from "../middlewares/auth-middleware";

export const authorRoutes = express.Router();

authorRoutes.post('/authors', AuthorController.register);
authorRoutes.post('/authors/login', AuthorController.login);
authorRoutes.get('/authors/profile', authMiddleware, AuthorController.getProfile);