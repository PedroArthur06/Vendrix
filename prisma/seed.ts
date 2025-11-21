import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const email = "admin@vendrix.com";
  const passwordRaw = "123456";
  const passwordHash = await bcrypt.hash(passwordRaw, 10);

  const admin = await prisma.user.create({
    data: {
      email,
      name: "Pedro Admin",
      role: "admin",
      passwordHash,
    },
  });

  console.log("Admin criado:", admin.email);

  const sneakersCategory = await prisma.category.create({
    data: { name: "Sneakers" },
  });

  const clothingCategory = await prisma.category.create({
    data: { name: "Vestuário" },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Nike Air Max Future",
        description: "O futuro dos sneakers com amortecimento revolucionário.",
        price: 1299.9,
        sku: "NK-AM-001",
        stock: 50,
        categoryId: sneakersCategory.id,
        imageUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      },
      {
        name: "Adidas Ultraboost X",
        description: "Conforto máximo para corrida e estilo urbano.",
        price: 999.9,
        sku: "AD-UB-002",
        stock: 30,
        categoryId: sneakersCategory.id,
        imageUrl:
          "https://images.unsplash.com/photo-1587563871167-1ee7974e3c64?q=80&w=2095&auto=format&fit=crop",
      },
      {
        name: "Yeezy Quantum Green",
        description: "Design exclusivo e limitado.",
        price: 2499.0,
        sku: "YZ-QT-003",
        stock: 10,
        categoryId: sneakersCategory.id,
        imageUrl:
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop",
      },
      {
        name: "Jaqueta Tech Fleece",
        description: "Tecnologia térmica para dias frios.",
        price: 499.9,
        sku: "NK-TF-004",
        stock: 100,
        categoryId: clothingCategory.id,
        imageUrl:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
      },
    ],
  });

  console.log("Banco de dados populado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
