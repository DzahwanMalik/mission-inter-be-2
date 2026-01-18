import { db } from "../config/database.js";
import fs from "fs";

const getMovies = async (req, res) => {
  const { search, popular, newRelease } = req.query;

  try {
    const query = db("movies").select();

    if (search) {
      query
        .whereILike("title", `%${search}%`)
        .orWhereILike("description", `%${search}%`);
    }

    if (popular === "true") {
      query.orderBy("popularity", "desc").limit(3);
    }

    if (newRelease === "true") {
      query.orderBy("release_date", "desc").limit(3);
    }

    const movies = await query;

    res.json({
      result: movies,
      message: "Get all movies successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await db.select().from("movies").where("id", id);

    res.json({
      result: movie,
      message: "Get movie by id successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createMovie = async (req, res) => {
  const {
    title,
    description,
    rating,
    release_date,
    popularity,
    age_rating,
    trailer_key,
    runtime,
  } = req.body;

  const poster_image = req.file.path.replace("\\", "/");

  try {
    const [movie] = await db("movies").insert({
      title,
      description,
      rating,
      release_date,
      popularity,
      age_rating,
      poster_image,
      trailer_key,
      runtime,
    });

    const updatedMovies = await db.select().from("movies").where("id", movie);

    res.json({
      result: updatedMovies,
      message: "Create movie successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    rating,
    release_date,
    popularity,
    age_rating,
    trailer_key,
    runtime,
  } = req.body;

  try {
    const movie = await db.select().from("movies").where("id", id).first();

    if (!movie) {
      const error = new Error("Movie not found");
      error.status = 404;
      throw error;
    }

    let posterImage = await movie.poster_image;

    if (req.file) {
      posterImage = req.file.path.replace("\\", "/");

      fs.unlinkSync(movie.poster_image);
    }

    await db
      .update({
        title,
        description,
        rating,
        release_date,
        popularity,
        age_rating,
        poster_image: posterImage,
        trailer_key,
        runtime,
      })
      .from("movies")
      .where("id", id);

    const updatedMovies = await db.select().from("movies").where("id", id);

    res.json({
      result: updatedMovies,
      message: "Update movie successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    await db.delete().from("movies").where("id", id);

    res.json({
      message: "Delete movie successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };
