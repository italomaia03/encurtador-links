import { Prisma } from '@prisma/client';
import prisma from '../config/postgres.config';
import { URLModel } from '../models/url.model';
import { UrlAlreadyExistsError } from '../errors/url-already-exists.error';

export class UrlRepository {
  async create(url: URLModel) {
    try {
      const savedUrl = await prisma.url.create({
        data: {
          longUrl: url.longUrl,
          shortUrl: url.shortUrl,
          urlCode: url.urlCode,
        },
      });
      return savedUrl;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.error(
            'There is a unique constraint violation, a new url cannot be created with this urlCode',
          );
          throw new UrlAlreadyExistsError('URL code already exists');
        }
      }
    }
  }

  async findByUrlCode(urlCode: string) {
    return await prisma.url.findUnique({
      where: { urlCode },
    });
  }
}
