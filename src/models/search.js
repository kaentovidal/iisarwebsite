import { pool } from "../controllers/index.controller.js";


export const getProduct = async (req, res) => {

    let { search } = req.body;

    pool.query(
        `SELECT * FROM product
        WHERE product_name = $1`,
        [search],
        (err, results) => {
            if (err) {
            console.log("Hola");
            throw err
        } else {
            res.render("search", { results: results.rows })
        }
    })
  
};