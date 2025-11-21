import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { validateRequest } from "../../../../shared/infra/http/middlewares/validateRequest";
import { createProductSchema } from "../schemas/product.schemas";
import { authenticateToken } from "../../../../shared/infra/http/middlewares/auth.middleware";
import { authorizeRoles } from "../../../../shared/infra/http/middlewares/authorization.middleware";

const router = Router();
const productController = new ProductController();

router.get("/products", productController.findAll.bind(productController));

router.get("/products/:id", productController.findOne.bind(productController));

router.post(
  "/products",
  authenticateToken,
  authorizeRoles(["admin", "supplier"]),
  validateRequest(createProductSchema),
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
