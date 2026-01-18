import express from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movies.controller.js";
import { verifyToken } from "../middleware/auth.js";

const moviesRouter = express.Router();

moviesRouter.get("/movies", verifyToken, getMovies);
moviesRouter.get("/movies/:id", verifyToken, getMovieById);
moviesRouter.post("/movies", verifyToken, createMovie);
moviesRouter.patch("/movies/:id", verifyToken, updateMovie);
moviesRouter.delete("/movies/:id", verifyToken, deleteMovie);

export default moviesRouter;
