import express from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/auth/register", registerUser);
authRouter.post("/auth/login", loginUser);
authRouter.get("/auth/verify", verifyToken, verifyEmail);

export default authRouter;
