import passport from 'passport'
import passportLocal from 'passport-local'
import {User} from '../models/User'
import JwtStrategy, {ExtractJwt} from 'passport-jwt'

const LocalStrategy = passportLocal.Strategy;
const jwtStrategy = JwtStrategy.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({email: email.toLowerCase()}, (err, user: any) => {
        if (err) return done(err)
        if (!user) return done(undefined, false, {message: `Email ${email} not found`})
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) return done(err)
            if (isMatch) return done(undefined, user);
            return done(undefined, false, {message: "Invalid email or password."});
        });

    })
}));

passport.use(new jwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY
    },
    (payload, done) => {
        User.findOne({_id: payload.id}, (err, user) => {
            if (err) return done(err, false)
            if (!user) return done(undefined, false)
            return done(undefined, user)
        })
    }
))

