//import
import express from 'express'
import { register, login } from "../controller/authcontroller.js";
import { isAdmin } from '../midelware/authermiddleware.js'

const routes = express.Router();
//api locations
routes.post("/register", isAdmin, register);
routes.post("/login", login);
export default routes;