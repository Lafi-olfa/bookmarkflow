import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (to: string, resetLink: string) => {
  try {
    const info = await transporter.sendMail({
      from: '"Support" <no-reply@example.com>',
      to,
      subject: 'Reset your password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });
    return info;
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};
