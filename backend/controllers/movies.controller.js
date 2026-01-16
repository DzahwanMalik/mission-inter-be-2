import { db } from "../config/database.js";

const getMovies = async (req, res) => {
  try {
    const movies = await db.select().from("movies");

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
    poster_url,
    poster_public_id,
    backdrop_url,
    backdrop_public_id,
    trailer_key,
    runtime,
  } = req.body;

  try {
    const [movie] = await db("movies").insert({
      title,
      description,
      rating,
      release_date,
      popularity,
      age_rating,
      poster_url,
      poster_public_id,
      backdrop_url,
      backdrop_public_id,
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
    poster_url,
    poster_public_id,
    backdrop_url,
    backdrop_public_id,
    trailer_key,
    runtime,
  } = req.body;

  try {
    await db
      .update({
        title,
        description,
        rating,
        release_date,
        popularity,
        age_rating,
        poster_url,
        poster_public_id,
        backdrop_url,
        backdrop_public_id,
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
    const movie = await db.delete().from("movies").where("id", id);

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
