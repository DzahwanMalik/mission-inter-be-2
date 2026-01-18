import dotenv from "dotenv";
import transporter from "../config/nodemailer.js";

dotenv.config();

const sendVerifyToken = async (email, token) => {
  const mailOptions = {
    from: `"Movies App Support" ${process.env.EMAIL}`,
    to: email,
    subject: "Verify your email",
    text: `Your verify token is ${token}`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendVerifyToken;
