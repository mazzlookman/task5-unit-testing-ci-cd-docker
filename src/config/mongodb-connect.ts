import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/books_management';

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
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

