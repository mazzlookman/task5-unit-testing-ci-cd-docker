import express from "express";
import {connectToMongoDB, disconnectFromMongoDB} from "./config/mongodb-connect";
import {authorRoutes} from "./routes/author-routes";
import {ErrorMiddleware} from "./middlewares/error-middleware";

const app = express();
const PORT = process.env.PORT || 3000;

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
app.use(express.json());

app.use('/api', authorRoutes);
app.use(ErrorMiddleware);

// server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});