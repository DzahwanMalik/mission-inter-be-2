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
moviesRouter.get("/movies/:id", getMovieById);
moviesRouter.post("/movies", createMovie);
moviesRouter.patch("/movies/:id", updateMovie);
moviesRouter.delete("/movies/:id", deleteMovie);

export default moviesRouter;
