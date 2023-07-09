import { Strategy as LocalStrategy } from 'passport-local';
import { pool } from '../controllers/index.controller.js';
import bcrypt from "bcrypt";



export function initialize(passport) {
    console.log("passport inicializado");

    const authUser = (email, password, done) => {
        console.log(email, password);
        
        pool.query(
            `SELECT * FROM users WHERE user_email = $1`, [email], (err, results) => {
                if (err) {
                    
                    throw err;
                }

                console.log(results.rows);

                if (results.rows.length > 0) {
                    const user = results.rows[0]
                    console.log(user);

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            throw err
                        }

                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, {message: "Contraseña incorrecta"})
                        }
                    })
                } else {
                    return done(null, false, {message: "Correo no registrado"})
                }
            }
        )



    }




    passport.use(new LocalStrategy({
        usernameField: "user_email",
        passwordField: "user_password"
    }, authUser))


    passport.serializeUser((user, done) => done(null, user.id))

    passport.deserializeUser((id, done) => {
        pool.query(`SELECT * FROM users WHERE user_id = $1`, [id], (err, results) => {
            if (err) {
                throw err
            }
            console.log(`ID is ${results.rows[0].id}`);
            return done(null, result.rows[0])
        })
    })









}








