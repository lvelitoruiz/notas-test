import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User';

dotenv.config();

const createDefaultUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    
    const defaultUser = new User({
      username: 'admin',
      password: 'password123'
    });

    await defaultUser.save();
    console.log('Default user created successfully');
  } catch (error) {
    console.error('Error creating default user:', error);
  } finally {
    await mongoose.disconnect();
  }
};

createDefaultUser();