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

type Serialized<T> = {
  [P in keyof T]: T[P] extends Date ? string : T[P];
};

export type Product = Serialized<ProductResponse>;