//import
import express from 'express'
import { register, login } from "../controller/authcontroller.js";
const routes = express.Router();
//api locations
routes.post("/register", register);
routes.post("/login", login);
export default routes;