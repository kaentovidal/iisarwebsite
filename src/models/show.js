import { pool } from "../controllers/index.controller.js";



export const showProducts = (req, res) => {
    pool.query("SELECT * FROM product", (err, results) => {
      if (err) {
        throw err
      } else {
          const products = results
      }
  })
};