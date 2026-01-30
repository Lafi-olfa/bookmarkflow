import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import manquant
import { User } from '../models/user';
export const signupUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ error: 'E-mail address is already registered' });
    }

    user = new User({ firstName, lastName, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json(user);
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
      userName: `${user.firstName} ${user.lastName}`,
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
