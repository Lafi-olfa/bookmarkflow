import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (to: string, token: string) => {
  await transporter.sendMail({
    to,
    subject: 'Reset your password',
    html: `
      <p>You requested a password reset</p>
      <a href="http://localhost:5173/reset-password?token=${token}">
        Click here to reset password
      </a>
    `,
  });
};
