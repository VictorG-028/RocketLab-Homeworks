import { PrismaClient } from '@prisma/client';
import { products } from "./createMockProduts";
import { exampleAddress, exampleUser } from "./createMockUser";

const prisma = new PrismaClient();

async function main() {

  products.map(async (p) => {
    return await prisma.product.upsert({
      where: { id: p.id },
      update: p,
      create: p
    });
  });

  await prisma.user.upsert({
    where: { id: exampleUser.id },
    update: exampleUser,
    create: exampleUser,
    // include: { addresses: true }
  });

  await prisma.address.upsert({
    where: { id: exampleAddress.id },
    update: exampleAddress,
    create: exampleAddress
  });

  console.log("Database seeded successfully!");

  process.exit();
}

main();
