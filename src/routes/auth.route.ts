import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { LoginSchema, registerSchema } from "../validations/auth.validate";

const router = Router();

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(LoginSchema), login);

export default router;
