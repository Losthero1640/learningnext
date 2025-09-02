import nodemailer from "nodemailer";

export const sendResetPasswordEmail = async (
  email: string,
  resetLink: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_NODEMAILER,
        pass: process.env.PASS_NODEMAILER,
      },
    });

    const mailOptions = {
      from: process.env.USER_NODEMAILER,
      to: email,
      subject: "Reset your password",
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank" style="color:blue;">
          Reset Password
        </a>
        <p>If you didn’t request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Reset password email sent to:", email);
  } catch (error) {
    console.error("❌ Error sending reset password email:", error);
    throw new Error("Failed to send reset password email");
  }
};
