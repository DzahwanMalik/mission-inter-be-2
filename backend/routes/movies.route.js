import express from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movies.controller.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const moviesRouter = express.Router();

moviesRouter.get("/movies", verifyToken, getMovies);
moviesRouter.get("/movies/:id", getMovieById);
moviesRouter.post("/movies", upload.single("poster_image"), createMovie);
moviesRouter.patch("/movies/:id", upload.single("poster_image"), updateMovie);
moviesRouter.delete("/movies/:id", deleteMovie);

export default moviesRouter;
