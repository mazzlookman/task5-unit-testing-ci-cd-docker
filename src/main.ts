import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors"
import {connectToMongoDB, disconnectFromMongoDB} from "./config/mongodb-connect";
import {authorRoutes} from "./routes/author-routes";
import {ErrorMiddleware} from "./middlewares/error-middleware";
import session from "express-session";
import cookieParser from "cookie-parser";
import {getEnv} from "./utils/env-value";
import {corsOptions} from "./config/cors";
import {bookRoutes} from "./routes/book-routes";
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from "./config/swagger";

// read .env file
dotenv.config();

// mongodb setup
connectToMongoDB();

process.on('SIGINT', async () => {
    await disconnectFromMongoDB();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await disconnectFromMongoDB();
    process.exit(0);
});

// express setup
export const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// session setup
app.use(session({
    secret: getEnv('SECRET_KEY'),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // set true if using HTTPS
        httpOnly: true
    }
}));

// api docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes setup
app.use('/api', authorRoutes)
app.use('/api', bookRoutes);
app.use(ErrorMiddleware);

// server
const port = getEnv('PORT');
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});