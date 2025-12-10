//import
import express from 'express'
import { categories, updateCategories, deletecategory, getCategories, getcategoriesById } from "../controller/CategoriesController.js";
// import authernticateToken from '../midelware/authermiddleware.js' 
import { authernticate, uatherRole } from '../midelware/authermiddleware.js'

const routes = express.Router();
//api locations
routes.post("/Addcategories", authernticate, categories);
routes.get("/getAll", uatherRole(['Admin']), getCategories);
routes.get("/:id", uatherRole(['Admin']), authernticate, getcategoriesById);
routes.put("/:id", uatherRole(['Admin']), authernticate, updateCategories);
routes.delete("/:id", uatherRole(['Admin']), authernticate, deletecategory);



export default routes;