import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateRequest } from "../../../../shared/infra/http/middlewares/validateRequest";
import { registerSchema, loginSchema } from "../schemas/auth.schemas";
import { rateLimitLogin } from "../../../../shared/infra/http/middlewares/rateLimit.middleware";

const router = Router();
const authController = new AuthController();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register.bind(authController)
);

router.post(
  "/login",
  validateRequest(loginSchema),
  rateLimitLogin,
  authController.login.bind(authController)
);

export default router;
