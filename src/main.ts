import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import {connectToMongoDB, disconnectFromMongoDB} from "./config/mongodb-connect";
import {authorRoutes} from "./routes/author-routes";
import {ErrorMiddleware} from "./middlewares/error-middleware";
import session from "express-session";
import cookieParser from "cookie-parser";
import {getEnv} from "./utils/env-value";

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
const app = express();
app.use(cookieParser());
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

app.use('/api', authorRoutes);
app.use(ErrorMiddleware);

// server
const port = getEnv('PORT');
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});