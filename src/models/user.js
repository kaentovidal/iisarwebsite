import { pool } from "../controllers/index.controller.js";


export const getProducts = async (req, res) => {
  const response = await pool.query("SELECT * FROM product");
  return res.json(response.rows[0]);
};

export const getDate = async (req, res) => {
  const response = await pool.query("SELECT NOW()");
  return res.json(response.rows[0]);
};

export const getUser = async (req, res) => {
  const response = await pool.query("SELECT * FROM users");
  return res.json(response.rows[0]);
};

