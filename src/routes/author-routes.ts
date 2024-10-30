import express from "express";
import {AuthorController} from "../controller/author-controller";

export const authorRoutes = express.Router();

authorRoutes.post('/authors', AuthorController.register);
