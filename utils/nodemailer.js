import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.NODEMAILER_USER_EMAIL,
		pass: process.env.NODEMAILER_USER_PASS,
	},
});

async function sendResetEmail(userEmail, link) {
	const mailOptions = {
		from: '"Support Team" abdelrahman.mohamed4030@gmail.com',
		to: userEmail,
		subject: "Password Reset Request",
		html: `
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password (valid for 30 minutes):</p>
      <a href="${link}">${link}</a>
    `,
	};

	await transporter.sendMail(mailOptions);
	console.log("✅ Reset email sent to:", userEmail);
}

export default sendResetEmail
