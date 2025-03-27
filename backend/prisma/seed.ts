import { PrismaClient } from '@prisma/client';
import users from './data/users.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: users,
  });

  console.log('Successfully added users to the database');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
