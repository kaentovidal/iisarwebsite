import { Router } from 'express'
import {getDate, getUser, pool} from '../controllers/index.controller.js';
import encrypt from "bcrypt";

const { hash } = encrypt

const router = Router()


router.get("/", (req, res) => {
  res.render('main');
});

router.get("/login", (req, res) => {
  res.render('login');
});

router.get("/register", (req, res) => {
  res.render('register');
});

router.post("/signup", async (req, res) => {
  
  let { name, email, password, password2 } = req.body
  
  console.log({
    name, email, password, password2
  })

  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({message: "Please enter all fields"})
  }
  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 character" });
  }
  if (password != password2) {
    errors.push({ message: "Password do not match" });
  }
  if (errors.length > 0) {
    res.render("register", { errors });
  } else {
    //form validation has passed
    let hashedPassword = await hash(password, 10)
    console.log(hashedPassword)
  }

  pool.query(
    `SELECT * FROM users
    WHERE user_email = $1`,
    [email],
    (err, results) => {
      if (err) {
        throw err
      }
      console.log(results.rows);
    }
    
  )

});



router.get("/ping", getDate)

router.get("/user", getUser);


export default router







