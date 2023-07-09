import pkg from 'pg'
import { config } from "dotenv";
config();

const { Pool } = pkg;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    //ssl: true // this u need to activate when u are in deploy mode
})

export const getDate = async (req, res) => {
    const response = await pool.query('SELECT NOW()')
    return res.json(response.rows[0])
}

export const getUser = async (req, res) => {
  const response = await pool.query("SELECT * FROM users");
  return res.json(response.rows[0]);
};






