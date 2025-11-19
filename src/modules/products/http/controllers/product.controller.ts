import { Request, Response } from "express";
import { ProductService } from "../../services/product.service";
import {
  CreateProductRequest,
  UpdateProductRequest,
} from "../../dtos/request.types";
import { AuthRequest } from "../../../../shared/infra/http/middlewares/auth.middleware";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const supplierId = req.user!.id;
      const data = req.body as CreateProductRequest;
      const result = await this.productService.createProduct(data, supplierId);

      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message === "Product with this SKU already exists" ||
          error.message === "Category not found"
        ) {
          res.status(409).json({ error: error.message });
          return;
        }
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.findAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const productId = req.params.id;
      const supplierId = req.user!.id;
      const data = req.body as UpdateProductRequest;

      const result = await this.productService.updateProduct(
        productId,
        data,
        supplierId
      );

      res.status(200).json(result);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("not found or access denied")
      ) {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const productId = req.params.id;
      const supplierId = req.user!.id;

      await this.productService.deleteProduct(productId, supplierId);

      res.status(204).send();
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("not found or access denied")
      ) {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
