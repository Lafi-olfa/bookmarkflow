import express from 'express';

import {
  loginUser,
  signupUser,
  forgotPassword,
} from '../controllers/authController';
const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.post('/forgot-password', forgotPassword);

export default router;
