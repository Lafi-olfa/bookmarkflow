import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import bookmarkRoutes from './routes/bookmarkRoutes';
import userRoutes from './routes/userRoutes';
import { auth } from './middleware/auth';

dotenv.config();
connectDB();

const app: Application = express();

app.use(express.json());

// routes
app.use('/api/bookmarks', auth, bookmarkRoutes);

app.use('/api/bookmarks/:id', auth, bookmarkRoutes);

// user
app.use('/', auth, userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
