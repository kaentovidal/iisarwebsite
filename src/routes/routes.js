import { Router } from 'express'
import { getDate, getUser, pool } from '../controllers/index.controller.js';
import { initialize } from "../passport/auth.js";
import encrypt from "bcrypt";
import passport from 'passport';

const { hash } = encrypt

const router = Router()


router.get("/", (req, res) => {
  res.render('main');
});

router.get("/dash", (req, res) => {
  res.render('dashboard');
});

router.get("/login", (req, res) => {
  res.render('login');
});

router.get("/register", (req, res) => {
  res.render('register');
});

router.post("/signup", async (req, res) => {
  
  let { name, email, password, password2 } = req.body
  
  let errors = [];

  console.log({
    name, email, password, password2
  })

  if (!name || !email || !password || !password2) {
    errors.push({message: "Por favor llena todos los campos"})
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
    let hashedPassword = await hash(password, 10)
    console.log(hashedPassword)


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
          errors.push({ message: "El correo ya se encuentra en nuestra base de datos" })
          res.render("register", {errors})
        } else {
          pool.query(
            `INSERT INTO users (
              user_name,
              user_email,
              user_password
            ) VALUES ($1,$2,$3)
            RETURNING user_id, user_password`, [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }

              console.log(results.rows);
              req.flash('success_msg', "Correo registrado, Inicia sesion")
              res.redirect("/login")

            }
          )
        }

        
      }
    );



  }

  

});

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/dash",
    failureRedirect: "/login",
    failureFlash: true
  }))



router.get("/logout", (req, res) => {
  req.logOut();
  req.flash('success_msg', "Se ha cerrado sesión")
  res.redirect("/login")
})

router.get("/ping", getDate)

router.get("/user", getUser);


export default router







