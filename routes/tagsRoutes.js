//import
import express from 'express'
import { Addtage, updateages, getAllTages, gettagesById, deleteTages } from "../controller/tagsController.js";
import { authernticate, isAdmin } from '../midelware/authermiddleware.js'

const routes = express.Router();
//api locations
routes.post("/Addtage", authernticate, isAdmin, Addtage);
routes.get("/Addtage", authernticate, isAdmin, getAllTages);
routes.get("/:id", authernticate, isAdmin, gettagesById);
routes.put("/:id", authernticate, isAdmin, updateages);
routes.post("/:id", authernticate, isAdmin, deleteTages);


export default routes;