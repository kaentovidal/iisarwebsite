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
                    
                    console.log(
                        "antes de mostrar " ,err
                    );
                }

                console.log("aqui se muestra el resultado de la comparacion de los datos y si coinciden se muestra el dato", results.rows);

                if (results.rows.length > 0) {
                    const user = results.rows[0]
                    console.log("Mostrando Usuario",user);

                    bcrypt.compare(password, user.user_password, (err, isMatch) => {
                        if (err) {
                            console.log("maldito error",err);
                            
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
        usernameField: "email",
        passwordField: "password"
    }, authUser))


    passport.serializeUser((user, done) => done(null, user.user_id))

    passport.deserializeUser((user_id, done) => {
        pool.query(`SELECT * FROM users WHERE user_id = $1`, [user_id], (err, results) => {
            if (err) {
                throw err
            }
            console.log(`ID is ${results.rows[0].user_id}`);
            return done(null, results.rows[0])
        })
    })









}








