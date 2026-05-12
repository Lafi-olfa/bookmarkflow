import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import manquant
import { User } from '../models/user';
import { sendResetEmail } from '../utils/mailer';
import crypto from 'crypto';

export const signupUser = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ error: 'E-mail address is already registered' });
    }

    user = new User({ fullName, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const jwtsecret = process.env.JWT_SECRET!;

  if (!email || !password) {
    return res.status(400).json({ error: 'email or password is required.' });
  }

  try {
    // 1. user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 3. secret JWT exist
    if (!jwtsecret) {
      return res.status(500).json({ error: 'Server error' });
    }

    // 4. Create token JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, jwtsecret, {
      expiresIn: '2d',
    });

    // 5. prepare response to front
    const userResponse = {
      id: user._id,
      email: user.email,
      userName: user.fullName,
    };

    // 6. return response
    res.status(200).json({
      message: 'Sucess',
      user: userResponse,
      token,
    });
  } catch (error: any) {
    console.error('Erreur connexion:', error);
    res.status(500).json({
      message: error.message || 'Erreur serveur',
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 1. generate token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 2. hash token (security best practice)
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // 3. save to DB

    await user.save();

    // 4. send email
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

    await sendResetEmail(email, resetLink);

    return res.json({ message: 'Reset email sent' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};
