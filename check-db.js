import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const r = await prisma.visualIdentity.findUnique({where:{id:1}});
  console.log(JSON.stringify(r,null,2));
  await prisma.$disconnect();
}

main();