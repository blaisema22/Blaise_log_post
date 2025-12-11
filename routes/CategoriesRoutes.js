//import
import express from 'express'
import { categories, updateCategories, deletecategory, getCategories, getcategoriesById } from "../controller/CategoriesController.js";
// import authernticateToken from '../midelware/authermiddleware.js' 
import { authernticate, isAdmin } from '../midelware/authermiddleware.js'

const routes = express.Router();
//api locations
routes.post("/Addcategories", authernticate, categories);
routes.get("/getAll", isAdmin, getCategories);
routes.get("/:id", isAdmin, authernticate, getcategoriesById);
routes.put("/:id", isAdmin, authernticate, updateCategories);
routes.delete("/:id", isAdmin, authernticate, deletecategory);



export default routes;