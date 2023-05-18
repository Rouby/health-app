import * as prismaPkg from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import * as newrelic from "newrelic";

newrelic.instrumentLoadedModule("@prisma/client", prismaPkg);

export const prisma = new PrismaClient();
