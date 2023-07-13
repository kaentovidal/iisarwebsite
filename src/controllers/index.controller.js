import pkg from 'pg'
import { config } from "dotenv";
config();

const { Pool } = pkg;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    //ssl: true // this u need to activate when u are in deploy mode
})








