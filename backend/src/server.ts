import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import bookmarkRoutes from './routes/bookmarkRoutes';
import userRoutes from './routes/userRoutes';
import { auth } from './middleware/auth';

dotenv.config();
connectDB();

const app: Application = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bookmarkflow-1922.vercel.app", // 👈 URL exacte
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
// routes
app.use('/api/bookmarks', bookmarkRoutes);

app.use('/api/bookmarks/:id', auth, bookmarkRoutes);

// user
app.use('/api/auth', userRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
