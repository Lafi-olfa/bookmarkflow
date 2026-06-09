import { model } from 'mongoose';
import { Schema } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  resetPasswordToken?: String;
  resetPasswordExpires?: Date;
}
export const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false },
});

export const User = model<IUser>('User', userSchema);
