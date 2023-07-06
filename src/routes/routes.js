import { Router } from 'express'
import {getDate} from '../controllers/index.controller.js';

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



router.get("/ping", getDate)



export default router







