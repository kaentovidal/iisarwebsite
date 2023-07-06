import pkg from 'pg'
import { config } from "dotenv";
config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

// const getUsers = async (req, res) => {
//     const response = await pool.query('SELECT * FROM conductor')
//     res.status(200).json(response.rows)
// }

export const getDate = async (req, res) => {
    const response = await pool.query('SELECT NOW()')
    return res.json(response.rows[0])
}

export const getUser = async (req, res) => {
  const response = await pool.query("SELECT * FROM users");
  return res.json(response.rows[0]);
};






