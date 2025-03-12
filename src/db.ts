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


const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Youtube', 'X', 'Articles', 'Others'],
    default: 'Others',
  },
  //impt
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  // impt
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

export const ContentModel = mongoose.model('Content', contentSchema);


const tagSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

export const TagModel = mongoose.model('Tag', tagSchema);

const linkSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  }
})

export const LinkModel = mongoose.model('Link', linkSchema);
