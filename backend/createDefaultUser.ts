import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User';

dotenv.config();

const createDefaultUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    
    const defaultUser = new User({
      username: 'lvelito',
      password: 'password123',
      email: 'l.velito.ruiz@gmail.com', 
      profilePicture: 'https://i.scdn.co/image/ab67616d0000b273f421940bd3135c91afc659c8', 
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non tortor tempor eros imperdiet venenatis. Vivamus eu leo a neque sagittis facilisis. Aenean sed lectus condimentum magna tristique ultricies. Etiam enim ante, egestas ut ipsum vel, volutpat rhoncus lectus. Integer rutrum fermentum convallis. Maecenas porta eros vel ipsum efficitur, facilisis pellentesque orci volutpat. Maecenas nec ornare nunc. Pellentesque consequat, nulla quis pharetra molestie, erat nibh aliquam risus, id faucibus urna velit a nisl. Suspendisse volutpat vitae enim vel interdum. Sed porta justo enim, in sagittis erat laoreet quis. Etiam rhoncus dolor leo, ac tincidunt nulla rutrum consectetur. Cras sed justo ut sem finibus facilisis ac sed enim. Donec ornare odio non ante convallis accumsan. Nunc lacus mi, tristique eget mauris vel, dictum condimentum arcu.', 
      noteCount: 0, 
    });

    await defaultUser.save();
    console.log('Default user created successfully');
    
    const createdUser = await User.findOne({ username: 'admin' }).select('-password');
    console.log('Created user:', createdUser);
  } catch (error) {
    console.error('Error creating default user:', error);
  } finally {
    await mongoose.disconnect();
  }
};

createDefaultUser();