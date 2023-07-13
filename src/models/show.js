import { pool } from "../controllers/index.controller.js";




export const main = (req, res) => {
  pool.query("SELECT * FROM product", (err, results) => {
    if (err) {
      throw err;
    } else {
      res.render("main", { results: results.rows });
    }
  });
};
