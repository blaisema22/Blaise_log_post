//import
import express from 'express'
import { Addpost, getAllposts, getpostsById, deletePosts, updatePosts } from "../controller/postsController.js";
import { authernticate, isAdmin, isAuthor } from '../midelware/authermiddleware.js'

const routes = express.Router();
//api locations
routes.post("/Addpost", authernticate, isAuthor, Addpost);
routes.get("/allpost", getAllposts);
routes.get("/:id", authernticate, isAdmin || isAuthor, getpostsById);
routes.put("/:id", authernticate, isAdmin || isAuthor, updatePosts);
routes.delete("/:id", authernticate, isAdmin || isAuthor, deletePosts);

export default routes;