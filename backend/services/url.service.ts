import { nanoid } from 'nanoid';
import { envConfig } from '../config/env.config';
import { NotFoundError } from '../errors/not-found.error';
import { URLModel } from '../models/url.model';
import { UrlRepository } from '../repositories/url.repository';
import { BadRequestError } from '../errors/bad-request.error';
import { UrlAlreadyExistsError } from '../errors/url-already-exists.error';

export class URLService {
  constructor(private readonly urlRepository: UrlRepository) {}

  async createShortUrl(longUrl: string) {
    if (!longUrl || !longUrl.trim().length) {
      throw new BadRequestError('Long URL not provided');
    }
    const urlCode = nanoid(8);
    const shortUrl = `${envConfig.DOMAIN_NAME}/${urlCode}`;
    try {
      const url = new URLModel({ longUrl, shortUrl, urlCode });
      const newUrl = await this.urlRepository.create(url);
      return newUrl;
    } catch (error) {
      if (error instanceof UrlAlreadyExistsError) {
        throw new BadRequestError('URL code already exists');
      }
    }
  }

  async getLongUrl(urlCode: string) {
    if (!urlCode) {
      throw new BadRequestError('URL code is required');
    }
    const url = await this.urlRepository.findByUrlCode(urlCode);
    if (!url) {
      throw new NotFoundError('URL not found');
    }
    return url.longUrl;
  }
}
