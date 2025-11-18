import { Product } from "@prisma/client";
import { prisma } from "../../../shared/infra/database";
import { CreateProductRequest, ProductResponse } from "../dtos/request.types";

export class ProductService {
  private mapToProductResponse(
    product: Product & { category: { name: string } }
  ): ProductResponse {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toNumber(),
      sku: product.sku,
      stock: product.stock,
      categoryId: product.categoryId,
      categoryName: product.category.name,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  async createProduct(data: CreateProductRequest): Promise<ProductResponse> {
    const existingProduct = await prisma.product.findUnique({
      where: { sku: data.sku },
    });
    if (existingProduct) {
      throw new Error("Product with this SKU already exists");
    }

    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      throw new Error("Category not found");
    }

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        sku: data.sku,
        stock: data.stock || 0,
        categoryId: data.categoryId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.mapToProductResponse(newProduct as any);
  }

  async findAllProducts(): Promise<ProductResponse[]> {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return products.map((p: any) => this.mapToProductResponse(p));
  }
}
