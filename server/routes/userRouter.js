import express from "express";
import {
  login,
  logout,
  myProfile,
  register,

} from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";



const router = express.Router();

router.post("/login", login);

router.get("/logout", isAuthenticated, logout);
// if user is not authenticated then it cannot logout


router.get("/me", isAuthenticated, myProfile);
////whatever define in isAuthenticated means user then he can access myprofile here
router.post("/register", register);


export default router;
