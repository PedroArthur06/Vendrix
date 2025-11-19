import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { validateCreateProduct } from "../middlewares/validation.middleware";
import { authenticateToken } from "../../../../shared/infra/http/middlewares/auth.middleware";
import { authorizeRoles } from "../../../../shared/infra/http/middlewares/authorization.middleware";

const router = Router();
const productController = new ProductController();

router.get("/products", productController.findAll.bind(productController));

router.post(
  "/products",
  authenticateToken,
  authorizeRoles(["admin", "supplier"]),
  validateCreateProduct,
  productController.create.bind(productController)
);

router.patch(
  "/products/:id",
  authenticateToken,
  authorizeRoles(["admin", "supplier"]),
  productController.update.bind(productController)
);

router.delete(
  "/products/:id",
  authenticateToken,
  authorizeRoles(["admin", "supplier"]),
  productController.delete.bind(productController)
);

export default router;
