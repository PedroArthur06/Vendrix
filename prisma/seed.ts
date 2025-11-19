import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "teste@vendrix.com.br";
  const passwordRaw = "123456";

  const passwordHash = await bcrypt.hash(passwordRaw, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: "admin",
    },
    create: {
      email,
      name: "Pedro Admin",
      role: "admin",
      passwordHash,
    },
  });

  console.log("Usuário sincronizado com sucesso:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
