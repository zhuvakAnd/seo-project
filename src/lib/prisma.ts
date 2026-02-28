import { PrismaClient } from '@prisma/client';

declare global {
  // allow global.prisma in dev so we don't instantiate more than one client
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    // any options you need
  });

// only assign in development – in production a new instance is fine
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

