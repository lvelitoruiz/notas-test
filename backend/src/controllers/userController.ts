import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ $or: [{ username }, { email }] });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ username, email, password });
    await user.save();

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    res.status(201).json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      // Log para depuración
      console.log('Login attempt:', { username });
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await user.comparePassword(password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      user.lastActive = new Date();
      await user.save();
  
      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  
      res.json({ 
        token, 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email, 
          profilePicture: user.profilePicture,
          bio: user.bio,
          noteCount: user.noteCount
        } 
      });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  export const getProfile = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.user!.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        bio: user.bio,
        noteCount: user.noteCount,
        lastActive: user.lastActive
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { email, profilePicture, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user!.id,
      { email, profilePicture, bio },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};