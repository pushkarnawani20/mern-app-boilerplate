import express from "express";
import authController from "../controllers/auth.controller";
// import { signInValidator, signUpValidator } from "../../utils/validator";

const router = express.Router();

/**
 * @method - post
 * @endpoint - /signup
 * @description - signup user
 */

router.route("/users/signup").post(signUpValidator, authController.signUp);

export default router;
