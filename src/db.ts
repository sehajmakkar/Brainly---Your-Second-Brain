import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


// db connection is a bit different
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the .env file');
  process.exit(1);
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// export default connectDB;

// models and schemas
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
})

export const UserModel = mongoose.model('User', userSchema)


const contentModel = new mongoose.Schema({
  title: {

  },
  link: {

  },
  userId: {

  },
  tags: {

  }
})
