import { db } from "../config/database.js";

const getUsers = async (req, res) => {
  try {
    const users = await db("users").select("*");

    res.json({
      result: users,
      message: "Get all users successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export { getUsers };
