import { Request, Response, NextFunction } from "express";
import { CreateProductRequest } from "../../dtos/request.types";

export const validateCreateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, price, sku, categoryId, stock } =
    req.body as CreateProductRequest;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ error: "Product name is required" });
    return;
  }

  if (!price || typeof price !== "number" || price <= 0 || isNaN(price)) {
    res
      .status(400)
      .json({ error: "A valid price greater than zero is required" });
    return;
  }

  if (!sku || typeof sku !== "string" || sku.trim().length === 0) {
    res.status(400).json({ error: "Product SKU is required" });
    return;
  }

  if (
    !categoryId ||
    typeof categoryId !== "string" ||
    categoryId.trim().length === 0
  ) {
    res.status(400).json({ error: "Category ID is required" });
    return;
  }

  if (
    stock !== undefined &&
    (typeof stock !== "number" || stock < 0 || !Number.isInteger(stock))
  ) {
    res.status(400).json({ error: "Stock must be a non-negative integer" });
    return;
  }

  next();
};
