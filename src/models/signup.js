import { pool } from "../controllers/index.controller.js";
import encrypt from "bcrypt";
const { hash } = encrypt;

export const signup =   async (req, res) => {
  let { name, email, password, password2 } = req.body;

  let errors = [];

  console.log({
    name,
    email,
    password,
    password2,
  });

  if (!name || !email || !password || !password2) {
    errors.push({ message: "Por favor llena todos los campos" });
  }
  if (password.length < 6) {
    errors.push({ message: "La contraseña debe tener al menos 6 caracteres" });
  }
  if (password !== password2) {
    errors.push({ message: "Las contraseñas no coinciden" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    //form validation has passed
    let hashedPassword = await hash(password, 10);
    console.log(hashedPassword);

    pool.query(
      `SELECT * FROM users
        WHERE user_email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          errors.push({
            message: "El correo ya se encuentra en nuestra base de datos",
          });
          res.render("register", { errors });
        } else {
          pool.query(
            `INSERT INTO users (
              user_name,
              user_email,
              user_password
            ) VALUES ($1,$2,$3)
            RETURNING user_id, user_password`,
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }

              console.log(results.rows);
              req.flash("success_msg", "Correo registrado, Inicia sesion");
              res.redirect("/login");
            }
          );
        }
      }
    );
  }
};