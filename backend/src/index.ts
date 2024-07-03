import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});