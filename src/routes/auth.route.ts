import { Router } from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { LoginSchema, registerSchema } from "../validations/auth.validate.js";

const router = Router();

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(LoginSchema), login);
router.route("/refresh").post(refreshToken);
router.route("/logout").post(logout);

export default router;
