import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice",
      password: {
        create: {
          hash: await hash("hallo", 10),
        },
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob",
      password: {
        create: {
          hash: await hash("hallo", 10),
        },
      },
    },
  });
  const jb = await prisma.user.upsert({
    where: { email: "jonathan.burke.1311@googlemail.com" },
    update: {},
    create: {
      email: "jonathan.burke.1311@googlemail.com",
      name: "Jonathan Burke",
      password: {
        create: {
          hash: await hash("hallo", 10),
        },
      },
    },
  });

  await prisma.sexAct.create({
    data: {
      userId: jb.id,
      dateTime: new Date(2024, 1, 1, 12, 0),
      position: "Missionary",
      initiator: "USER",
      userFinished: true,
      partnerFinished: true,
    },
  });
  await prisma.sexAct.create({
    data: {
      userId: jb.id,
      dateTime: new Date(2024, 1, 2, 12, 0),
      position: "Missionary",
      initiator: "USER",
      userFinished: true,
      partnerFinished: true,
    },
  });
  await prisma.sexAct.create({
    data: {
      userId: jb.id,
      dateTime: new Date(2024, 1, 4, 12, 0),
      position: "Missionary",
      initiator: "USER",
      userFinished: true,
      partnerFinished: true,
    },
  });
  await prisma.sexAct.create({
    data: {
      userId: jb.id,
      dateTime: new Date(2024, 1, 10, 12, 0),
      position: "Missionary",
      initiator: "USER",
      userFinished: true,
      partnerFinished: true,
    },
  });
  await prisma.sexAct.create({
    data: {
      userId: jb.id,
      dateTime: new Date(2024, 1, 11, 12, 0),
      position: "Missionary",
      initiator: "USER",
      userFinished: true,
      partnerFinished: true,
    },
  });
  await prisma.sexAct.create({
    data: {
      userId: jb.id,
      dateTime: new Date(2024, 1, 12, 12, 0),
      position: "Missionary",
      initiator: "USER",
      userFinished: true,
      partnerFinished: true,
    },
  });

  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
