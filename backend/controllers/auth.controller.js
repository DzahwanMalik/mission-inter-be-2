import dotenv from "dotenv";
import { db } from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import sendVerifyToken from "../utils/sendVerifyToken.js";

dotenv.config();

const registerUser = async (req, res) => {
  const { fullname, username, password, email } = req.body;

  try {
    const newUser = await db.transaction(async (trx) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verifyToken = uuidv4();

      const [user] = await trx("users").insert({
        fullname,
        username,
        password: hashedPassword,
        email,
        verifyToken,
        isVerified: false,
      });

      const registeredUser = await trx.select().from("users").where("id", user);

      // Send verification email after successful registration
      if (registeredUser) {
        await sendVerifyToken(email, verifyToken);
      }

      return registeredUser;
    });

    res.json({
      result: newUser,
      message: "Register Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await db.transaction(async (trx) => {
      const user = await trx("users").where("email", email).first();

      if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        const error = new Error("Invalid password");
        error.status = 401;
        throw error;
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      return token;
    });

    res.json({
      token,
      message: "Login Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    await db.transaction(async (trx) => {
      const user = await trx("users")
        .where("verifyToken", req.query.token)
        .first();

      if (!user) {
        const error = new Error("Invalid verification token");
        error.status = 404;
        throw error;
      }

      await trx("users").where("id", user.id).update({ isVerified: true });
    });

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export { registerUser, loginUser, verifyEmail };
