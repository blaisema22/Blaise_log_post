//import
import express from 'express'
import { Addpost, getAllposts, getpostsById, deletePosts, updatePosts } from "../controller/postsController.js";
import { authernticate, uatherRole } from '../midelware/authermiddleware.js'

const routes = express.Router();
//api locations
routes.post("/Addpost", authernticate, uatherRole(['author', 'Admin']), Addpost);
routes.get("/allpost", getAllposts);
routes.get("/:id", authernticate, uatherRole(['Admin']), getpostsById);
routes.put("/:id", authernticate, uatherRole(['Admin']), updatePosts);
routes.delete("/:id", authernticate, uatherRole(['Admin']), deletePosts);

export default routes;