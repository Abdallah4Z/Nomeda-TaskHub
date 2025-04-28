import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      console.error('MongoDB URI is not defined in environment variables');
      process.exit(1);
    }

    console.log('Attempting to connect to MongoDB with URI:', MONGO_URI);
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB:`, error);
    process.exit(1);
  }
};

export default connectDB;