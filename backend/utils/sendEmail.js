import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
    console.log("Email skipped:", { to, subject, text });
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  });
};
