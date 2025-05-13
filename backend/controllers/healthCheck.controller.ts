import { Request, Response } from 'express';
import prisma from '../config/postgres.config';

const healthCheck = async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'OK',
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({
      status: 'DOWN',
      database: 'disconnected',
      error: (error as Error).message
    });
  }
};

export default healthCheck;