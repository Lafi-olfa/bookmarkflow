import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import manquant
import { User } from '../models/user';
import crypto from 'crypto';
import { sendResetEmail } from '../utils/mailer';

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
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  // Génération token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = new Date(Date.now() + 3600000);
  await user.save();

  const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

  try {
    await sendResetEmail(user.email, resetLink);
    return res.json({ message: 'Reset email sent' });
  } catch (emailError) {
    return res.status(500).json({ error: 'Failed to send email' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { password, token } = req.body;

    if (!password || !token) {
      return res.status(400).json({
        error: 'Password and token are required',
      });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        error: 'Invalid or expired token',
      });
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: 'Password reset successfully',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};
