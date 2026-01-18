import express from "express";
import dotenv from "dotenv";

import moviesRouter from "./routes/movies.route.js";
import usersRouter from "./routes/users.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API Routes
app.use(moviesRouter);
app.use(usersRouter);
app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
