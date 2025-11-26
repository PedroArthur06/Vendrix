import { PrismaClient, Brand, CategoryType } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando limpeza do banco...");
  await prisma.product.deleteMany();
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

  console.log("Iniciando população de produtos...");

  await prisma.product.createMany({
    data: [
      {
        name: "Nike Air Max Future",
        description: "O futuro dos sneakers com amortecimento revolucionário.",
        price: 1299.9,
        sku: "NK-AM-001",
        stock: 50,
        brand: Brand.NIKE,
        category: CategoryType.FOOTWEAR,
        imageUrl: "/img/tenis-nike.png",
      },
      {
        name: "Adidas Ultraboost X",
        description: "Conforto máximo para corrida e estilo urbano.",
        price: 999.9,
        sku: "AD-UB-002",
        stock: 30,
        brand: Brand.ADIDAS,
        category: CategoryType.FOOTWEAR,
        imageUrl: "/img/tenis-adidas.png",
      },
      {
        name: "Yeezy Quantum Green",
        description: "Design exclusivo e limitado.",
        price: 2499.0,
        sku: "YZ-QT-003",
        stock: 10,
        brand: Brand.YEEZY,
        category: CategoryType.FOOTWEAR,
        imageUrl: "/img/tenis-yeezy.png",
      },
      {
        name: "Vendrix Runner Prototype",
        description: "Nosso modelo exclusivo de performance.",
        price: 599.9,
        sku: "VX-RN-001",
        stock: 100,
        brand: Brand.VENDRIX,
        category: CategoryType.FOOTWEAR,
        imageUrl: "/img/tenis-futuro.png",
      },

      {
        name: "Jaqueta Tech Shell",
        description: "Proteção tática contra intempéries com design modular.",
        price: 899.9,
        sku: "JK-TC-001",
        stock: 15,
        brand: Brand.VENDRIX,
        category: CategoryType.APPAREL,
        imageUrl: "/img/jaqueta.png",
      },

      {
        name: "Mochila Carbon Core",
        description:
          "Estrutura rígida de fibra de carbono e iluminação integrada.",
        price: 650.0,
        sku: "AC-BP-002",
        stock: 20,
        brand: Brand.VENDRIX,
        category: CategoryType.ACCESSORIES,
        imageUrl: "/img/mochila.png",
      },
      {
        name: "Visor HUD Glass",
        description: "Óculos de realidade aumentada com interface neural.",
        price: 3499.0,
        sku: "AC-GL-001",
        stock: 5,
        brand: Brand.VENDRIX,
        category: CategoryType.ACCESSORIES,
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
