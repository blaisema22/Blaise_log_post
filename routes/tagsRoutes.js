//import
import express from 'express'
import { Addtage, updateages, getAllTages, gettagesById, deleteTages } from "../controller/tagsController.js";
import { authernticate, } from '../midelware/authermiddleware.js'

const routes = express.Router();
//api locations
routes.post("/Addtage", authernticate, Addtage);
routes.get("/Addtage", authernticate, getAllTages);
routes.get("/:id", authernticate, gettagesById);
routes.put("/:id", authernticate, updateages);
routes.post("/:id", authernticate, deleteTages);


export default routes;