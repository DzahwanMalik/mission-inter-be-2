import dotenv from "dotenv";
import { db } from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const registerUser = async (req, res) => {
  const { fullname, username, password, email } = req.body;

  try {
    await db.transaction(async (trx) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const [user] = await trx("users").insert({
        fullname,
        username,
        password: hashedPassword,
        email,
      });

      const registeredUser = await trx.select().from("users").where("id", user);

      trx.commit();

      res.json({
        result: registeredUser,
        message: "Register Successfully",
      });
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
    await db.transaction(async (trx) => {
      const user = await trx("users").where("email", email).first();

      if (!user) {
        trx.rollback();
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        trx.rollback();
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      res.json({
        token,
        message: "Login Successfully",
      });
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export { registerUser, loginUser };
