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
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Autorise si pas d'origin (Postman, mobile)
//       if (!origin) return callback(null, true);

//       // Autorise localhost (dev)
//       if (origin.startsWith("http://localhost")) return callback(null, true);

//       // Autorise tout ce qui vient de vercel.app
//       if (origin.endsWith(".vercel.app")) return callback(null, true);

//       // Bloque le reste
//       callback(new Error("CORS bloqué"));
//     },
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.use(
//   cors({
//     origin: [
//       'http://localhost:5174',
//       "http://localhost:4174",
//       'https://bookmarkflow-1922.vercel.app',
//       'https://bookmarkflow-production.up.railway.app',
//     ],
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );
app.use(
  cors({
    origin: (origin, callback) => {
      console.log(origin);
      
      if (!origin) return callback(null, true);
      if (origin.startsWith("http://localhost")) return callback(null, true);
if (origin.includes("vercel.app")) return callback(null, true);
      if (origin.endsWith(".railway.app")) return callback(null, true);
      // Ajoute ton URL Vercel exacte
      if (origin === "https://bookmarkflow.vercel.app") return callback(null, true);
      callback(new Error("CORS bloqué"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
// routes
app.use('/api/bookmarks', bookmarkRoutes);

app.use('/api/bookmarks/:id', auth, bookmarkRoutes);

// user
app.use('/api/auth', userRoutes);
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
