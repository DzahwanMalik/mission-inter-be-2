import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/auth", registerUser);
authRouter.post("/auth/login", loginUser);

export default authRouter;
