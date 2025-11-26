import { prisma } from "../../../shared/infra/database";
import { AppError } from "../../../shared/errors/AppError";
import { Brand, CategoryType, Prisma } from "@prisma/client";
import {
  CreateProductRequest,
  ProductResponse,
  UpdateProductRequest,
} from "../../../shared/types/product.types";

export class ProductService {
  private mapToProductResponse(product: any): ProductResponse {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      sku: product.sku,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
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

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        sku: data.sku,
        stock: data.stock || 0,
        brand: data.brand as Brand,
        category: data.category as CategoryType,
        imageUrl: data.imageUrl,
      },
    });

    return this.mapToProductResponse(newProduct);
  }

  async findAllProducts(
    search?: string,
    brand?: string,
    category?: string
  ): Promise<ProductResponse[]> {
    const whereCondition: Prisma.ProductWhereInput = {};

    if (search) {
      whereCondition.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (brand) {
      const upperBrand = brand.toUpperCase();
      if (upperBrand in Brand) {
        whereCondition.brand = upperBrand as Brand;
      } else {
        return [];
      }
    }

    if (category) {
      const upperCategory = category.toUpperCase();
      if (upperCategory in CategoryType) {
        whereCondition.category = upperCategory as CategoryType;
      } else {
        return [];
      }
    }

    const products = await prisma.product.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: "desc",
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
        brand: data.brand as Brand,
        category: data.category as CategoryType,
      },
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
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return this.mapToProductResponse(product);
  }
}
