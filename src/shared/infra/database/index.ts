import mongoose from "mongoose";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function connectDatabases() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected");

    await prisma.$connect();
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}
