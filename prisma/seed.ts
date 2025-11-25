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
        imageUrl: "/img/tenis1.png",
      },
      {
        name: "Adidas Ultraboost X",
        description: "Conforto máximo para corrida e estilo urbano.",
        price: 999.9,
        sku: "AD-UB-002",
        stock: 30,
        categoryId: sneakersCategory.id,
        imageUrl: "/img/tenis2.png",
      },
      {
        name: "Yeezy Quantum Green",
        description: "Design exclusivo e limitado.",
        price: 2499.0,
        sku: "YZ-QT-003",
        stock: 10,
        categoryId: sneakersCategory.id,
        imageUrl: "/img/tenis3.png",
      },
      {
        name: "Jaqueta Tech Shell",
        description: "Proteção tática contra intempéries com design modular.",
        price: 899.9,
        sku: "JK-TC-001",
        stock: 15,
        categoryId: clothingCategory.id,
        imageUrl: "/img/jaqueta.png",
      },
      {
        name: "Mochila Carbon Core",
        description:
          "Estrutura rígida de fibra de carbono e iluminação integrada.",
        price: 650.0,
        sku: "AC-BP-002",
        stock: 20,
        categoryId: clothingCategory.id,
        imageUrl: "/img/mochila.png",
      },
      {
        name: "Visor HUD Glass",
        description: "Óculos de realidade aumentada com interface neural.",
        price: 3499.0,
        sku: "AC-gl-001",
        stock: 5,
        categoryId: clothingCategory.id,
        imageUrl: "/img/oculos.png",
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
