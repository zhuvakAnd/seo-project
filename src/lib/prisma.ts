import { PrismaClient } from '@prisma/client';

// ensure a single instance of PrismaClient is used in development
// to avoid exhausting database connections when hot-reloading
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
