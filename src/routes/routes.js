import { Router } from 'express'
import { getDate, getUser, getProducts } from "../models/user.js";
import { main } from "../models/show.js";
import passport from 'passport';
import { signup } from '../models/signup.js';
import { getProduct } from'../models/search.js'


const router = Router()

router.get("/", main);

router.get("/dash", (req, res) => {
  res.render('dashboard');
});

router.get("/login", (req, res) => {
  res.render('login');
});

router.get("/register", (req, res) => {
  res.render('register');
});


router.get("/logout", (req, res) => {
  req.logOut();
  req.flash('success_msg', "Se ha cerrado sesión")
  res.redirect("/login")
})

router.get("/ping", getDate);

router.get("/user", getUser);

router.get("/prs", getProduct);


router.post("/search", getProduct);


router.post("/signup", signup);


router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dash",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

export default router







