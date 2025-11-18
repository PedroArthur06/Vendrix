import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { validateCreateProduct } from "../middlewares/validation.middleware";
import { authenticateToken } from "../../../../shared/infra/http/middlewares/auth.middleware";

const router = Router();
const productController = new ProductController();

router.get(
  "/products",
  authenticateToken,
  productController.findAll.bind(productController)
);

router.post(
  "/products",
  authenticateToken,
  validateCreateProduct,
  productController.create.bind(productController)
);

export default router;
