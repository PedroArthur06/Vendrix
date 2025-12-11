import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function connectDatabases() {
  try {
    await prisma.$connect();
    console.log("Postgres connected via Prisma");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}