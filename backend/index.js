import express from "express";
import dotenv from "dotenv";

import moviesRouter from "./routes/movies.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(moviesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
