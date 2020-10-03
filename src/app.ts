import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from "passport";
import 'dotenv/config'

import './config/passport'


// Create Express server
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })


// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json())

const MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: process.env.SECRET_KEY,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
}));

// passport middleWare
app.use(passport.initialize());
app.use(passport.session())

// router configuration
app.use('/user', require('./routes/user'))
app.use('/posts', require('./routes/posts'))


export default app;