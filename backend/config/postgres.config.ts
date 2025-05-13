import { PrismaClient } from '@prisma/client';
import { envConfig } from './env.config';

let prisma: PrismaClient;

if (envConfig.NODE_ENV !== 'production')
  prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

prisma = new PrismaClient();

export default prisma;