import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser'
import 'dotenv/config'



// Create Express server
const app = express();

// Connect to MongoDB
mongoose.connect( process.env.MONGO_URL, () => console.log('connected to db'))

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json())
app.use('/posts', require('./routes/posts'))


export default app;