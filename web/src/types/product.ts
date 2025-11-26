import type { ProductResponse } from "@shared/types/product.types";

type Serialized<T> = {
  [P in keyof T]: T[P] extends Date ? string : T[P];
};

export type Product = Serialized<ProductResponse>;
