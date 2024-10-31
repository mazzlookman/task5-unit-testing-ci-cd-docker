import mongoose from "mongoose";
import {getEnv} from "../utils/env-value";

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(getEnv('MONGO_URI'), {
            dbName: 'books_management',
        });
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB: ', (err as Error).message);
        process.exit(1);
    }
}

export const disconnectFromMongoDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Error disconnecting from MongoDB:', (err as Error).message);
    }
}

