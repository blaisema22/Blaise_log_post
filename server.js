//imports 
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { db } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import categories from './routes/CategoriesRoutes.js'
import post from './routes/postsRoutes.js'
import tage from './routes/tagsRoutes.js'


//express app
const app = express();
//midel ware
app.use(express.json());
app.use(cors());
//conection from database
db.getConnection((err) => {
        if (err) {
            console.log('not connected', err);
        } else {
            console.log('connected to database');
        }

    })
    //env file config
dotenv.config();
//Routes
//register & ligion
app.use("/api/auths", authRoutes)
    //created categories
app.use("/api/categories", categories)
    //create post
app.use("/api/posts", post)
    //create tage
app.use("/api/tage", tage)

//ports
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});