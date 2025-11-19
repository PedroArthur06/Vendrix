import { execSync } from "child_process";
import { prisma } from "../database";
import { beforeAll, afterAll, beforeEach } from "vitest";

beforeAll(() => {
  const dbUrl =
    "postgresql://admin:adminpassword@localhost:5432/vendrix_test?schema=public";

  process.env.DATABASE_URL = dbUrl;

  try {
    execSync("npx prisma db push --accept-data-loss --force-reset", {
      env: {
        ...process.env,
        DATABASE_URL: dbUrl,
      },
    });
  } catch (error) {
    console.error("Erro ao configurar banco de teste:", error);
    throw error;
  }
}, 30000);

beforeEach(async () => {
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
