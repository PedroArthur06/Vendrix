export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  sku: string;
  stock?: number;
  categoryId: string;
  imageUrl: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string | null;
  price: number;
  sku: string;
  stock: number;
  categoryId: string;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
}
