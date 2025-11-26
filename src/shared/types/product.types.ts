export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  sku: string;
  stock?: number;
  brand: "NIKE" | "ADIDAS" | "YEEZY" | "VENDRIX";
  category: "FOOTWEAR" | "APPAREL" | "ACCESSORIES";
  imageUrl: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string | null;
  price: number;
  sku: string;
  stock: number;
  brand: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  brand?: "NIKE" | "ADIDAS" | "YEEZY" | "VENDRIX";
  category?: "FOOTWEAR" | "APPAREL" | "ACCESSORIES";
}
