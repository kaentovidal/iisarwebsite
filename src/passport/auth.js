import { Passport } from ("passport")
import LocalStrategy from ("passport-local").Strategy


Passport.use('local-signup', new LocalStrategy({
    username: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    
}))







