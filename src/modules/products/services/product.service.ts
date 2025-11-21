import { prisma } from "../../../shared/infra/database";
import { AppError } from "../../../shared/errors/AppError";
import {
  CreateProductRequest,
  ProductResponse,
  UpdateProductRequest,
} from "../dtos/request.types";

export class ProductService {
  private mapToProductResponse(product: any): ProductResponse {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      sku: product.sku,
      stock: product.stock,
      categoryId: product.categoryId,
      categoryName: product.category?.name,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      imageUrl: product.imageUrl,
    };
  }

  async createProduct(
    data: CreateProductRequest,
    supplierId: string
  ): Promise<ProductResponse> {
    const existingProduct = await prisma.product.findUnique({
      where: { sku: data.sku },
    });

    if (existingProduct) {
      throw new AppError("Product with this SKU already exists", 409);
    }

    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        sku: data.sku,
        stock: data.stock || 0,
        categoryId: data.categoryId,
        // supplierId: supplierId,
        imageUrl: data.imageUrl,
      },
      include: {
        category: { select: { name: true } },
      },
    });

    return this.mapToProductResponse(newProduct);
  }

  async findAllProducts(): Promise<ProductResponse[]> {
    const products = await prisma.product.findMany({
      include: {
        category: { select: { name: true } },
      },
    });
    return products.map((p) => this.mapToProductResponse(p));
  }

  async updateProduct(
    productId: string,
    data: UpdateProductRequest,
    supplierId: string
  ): Promise<ProductResponse> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    // if (product.supplierId !== supplierId) throw new AppError("Forbidden", 403);

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
      },
      include: { category: { select: { name: true } } },
    });

    return this.mapToProductResponse(updatedProduct);
  }

  async deleteProduct(productId: string, supplierId: string): Promise<void> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    await prisma.product.delete({
      where: { id: productId },
    });
  }

  async findProductById(id: string): Promise<ProductResponse> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: { select: { name: true } },
      },
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return this.mapToProductResponse(product);
  }
}
