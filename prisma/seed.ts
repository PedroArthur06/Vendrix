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

  await prisma.user.create({
    data: {
      email,
      name: "Pedro Admin",
      role: "admin",
      passwordHash,
    },
  });

  console.log("Iniciando população de produtos...");

  await prisma.product.createMany({
    data: [
      // --- TENIS ANTIGOS (VENDRIX) ---
      {
        name: "Vendrix Cyber Runner X1",
        description: "Edição limitada com tecnologia de propulsão.",
        price: 899.9,
        sku: "VX-CR-001",
        stock: 50,
        brand: Brand.VENDRIX,
        category: CategoryType.FOOTWEAR,
        imageUrl: "/img/tenis1.png",
      },
      {
        name: "Vendrix White Flow",
        description: "Design minimalista para o futuro urbano.",
        price: 750.0,
        sku: "VX-WF-002",
        stock: 30,
        brand: Brand.VENDRIX,
        category: CategoryType.FOOTWEAR,
        imageUrl: "/img/tenis2.png",
      },
      {
        name: "Vendrix Heavy Duty Bot",
        description: "Resistência extrema para ambientes hostis.",
        price: 1100.0,
        sku: "VX-HD-003",
        stock: 10,
        brand: Brand.VENDRIX,
        category: CategoryType.FOOTWEAR,
        imageUrl: "/img/tenis3.png",
      },
      // --- ITENS DIVERSOS (HOME PAGE) ---
      {
        name: "Jaqueta Tech Shell",
        description: "Proteção tática contra intempéries.",
        price: 899.9,
        sku: "JK-TC-001",
        stock: 15,
        brand: Brand.VENDRIX,
        category: CategoryType.APPAREL,
        imageUrl: "/img/jaqueta.png",
      },
      {
        name: "Mochila Carbon Core",
        description: "Estrutura rígida de fibra de carbono.",
        price: 650.0,
        sku: "AC-BP-002",
        stock: 20,
        brand: Brand.VENDRIX,
        category: CategoryType.ACCESSORIES,
        imageUrl: "/img/mochila.png",
      },
      {
        name: "Visor HUD Glass",
        description: "Óculos de realidade aumentada.",
        price: 3499.0,
        sku: "AC-GL-001",
        stock: 5,
        brand: Brand.VENDRIX,
        category: CategoryType.ACCESSORIES,
        imageUrl: "/img/oculos.png",
      },
      // --- OUTRAS MARCAS ---
      {
        name: "Nike Air Max Future",
        description: "O futuro dos sneakers.",
        price: 1299.9,
        sku: "NK-AM-001",
        stock: 50,
        brand: Brand.NIKE,
        category: CategoryType.FOOTWEAR,
        imageUrl: "/img/tenis-nike.png",
      },
      {
        name: "Adidas Ultraboost X",
        description: "Conforto máximo.",
        price: 999.9,
        sku: "AD-UB-002",
        stock: 30,
        brand: Brand.ADIDAS,
        category: CategoryType.FOOTWEAR,
        imageUrl: "/img/tenis-adidas.png",
      },
      {
        name: "Yeezy Quantum Green",
        description: "Design exclusivo.",
        price: 2499.0,
        sku: "YZ-QT-003",
        stock: 10,
        brand: Brand.YEEZY,
        category: CategoryType.FOOTWEAR,
        imageUrl: "/img/tenis-yeezy.png",
      },
      {
        name: "Jaqueta Tech Shell",
        description: "Proteção tática contra intempéries.",
        price: 899.9,
        sku: "JK-TC-002",
        stock: 15,
        brand: Brand.VENDRIX,
        category: CategoryType.APPAREL,
        imageUrl: "/img/jaqueta2.png",
      },
      {
        name: "Visor HUD Glass Pro",
        description: "Óculos de realidade aumentada.",
        price: 3499.0,
        sku: "AC-GL-002",
        stock: 5,
        brand: Brand.VENDRIX,
        category: CategoryType.ACCESSORIES,
        imageUrl: "/img/oculos2.png",
      },
    ],
  });

  console.log("Banco populado! Lembre de rodar o servidor novamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
