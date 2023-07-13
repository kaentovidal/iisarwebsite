import { Router } from 'express'
import { getDate, getUser, getProducts } from "../models/user.js";
//import { showProducts } from "../models/show.js";
import passport from 'passport';
import { signup } from '../models/signup.js';
import { pool } from "../controllers/index.controller.js";



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

router.post("/signup", signup);

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

router.get("/ping", getDate);

router.get("/user", getUser);

router.get("/prs", getProducts);

router.get("/show", (req, res) => {
  pool.query('SELECT * FROM product', (err, results) => {
    if (err) {
      throw err;
    } else {
      res.render('show', { results: results.rows });
    }
  });
  
});


export default router







