import express from "express";
import { getUsers } from "../controllers/users.controller.js";
import { verifyToken } from "../middleware/auth.js";

const usersRouter = express.Router();

usersRouter.get("/users", verifyToken, getUsers);

export default usersRouter;
