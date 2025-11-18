export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  sku: string;
  stock?: number;
  categoryId: string;
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
}
