import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        res.status(400).json({
          error: "Validation failed",
          details: formattedErrors,
        });
        return;
      }

      console.error(error);

      res
        .status(500)
        .json({ error: "Internal server error during validation" });
    }
  };
};
