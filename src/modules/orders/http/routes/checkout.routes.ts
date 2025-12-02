import { Router } from "express";
import { CheckoutController } from "../controllers/checkout.controller";
import { authenticateToken } from "../../../../shared/infra/http/middlewares/auth.middleware";

const router = Router();
const checkoutController = new CheckoutController();

router.post(
  "/checkout",
  authenticateToken,
  checkoutController.createSession.bind(checkoutController)
);

export default router;
