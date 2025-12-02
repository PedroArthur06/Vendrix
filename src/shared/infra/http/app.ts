import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "../../../modules/users/http/routes/auth.routes";
import userRoutes from "../../../modules/users/http/routes/user.routes";
import productRoutes from "../../../modules/products/http/routes/product.routes";
import { errorHandler } from "./middlewares/errorHandler";
import checkoutRoutes from "../../../modules/orders/http/routes/checkout.routes";
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", checkoutRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

export { app };
