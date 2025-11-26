import { Request, Response } from "express";
import { ProductService } from "../../services/product.service";
import {
  CreateProductRequest,
  UpdateProductRequest,
} from "../../../../shared/types/product.types";
import { AuthRequest } from "../../../../shared/infra/http/middlewares/auth.middleware";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async create(req: AuthRequest, res: Response): Promise<void> {
    const supplierId = req.user!.id;
    const data = req.body as CreateProductRequest;

    const result = await this.productService.createProduct(data, supplierId);
    res.status(201).json(result);
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const { search, brand, category } = req.query;
    const products = await this.productService.findAllProducts(
      (search as string) || undefined,
      (brand as string) || undefined,
      (category as string) || undefined
    );
    res.status(200).json(products);
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    const productId = req.params.id;
    const supplierId = req.user!.id;
    const data = req.body as UpdateProductRequest;

    const result = await this.productService.updateProduct(
      productId,
      data,
      supplierId
    );
    res.status(200).json(result);
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    const productId = req.params.id;
    const supplierId = req.user!.id;

    await this.productService.deleteProduct(productId, supplierId);
    res.status(204).send();
  }

  async findOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = await this.productService.findProductById(id);
    res.status(200).json(product);
  }
}
