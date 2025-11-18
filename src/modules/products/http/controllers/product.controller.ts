import { Request, Response } from "express";
import { ProductService } from "../../services/product.service";
import { CreateProductRequest } from "../../dtos/request.types";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      // Nota: A lógica de autorização (se o usuário é Admin/Supplier) deve estar AQUI ou no middleware.
      const data = req.body as CreateProductRequest;
      const result = await this.productService.createProduct(data);

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
}
