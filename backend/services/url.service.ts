import { nanoid } from "nanoid";
import { URLModel } from "../models/url.model";
import { UrlRepository } from "../repositories/url.repository";
import { envConfig } from "../config/env.config";

export class URLService {
  constructor(private readonly urlRepository: UrlRepository) {}

  async createShortUrl(longUrl: string) {
    try {
      const urlCode = nanoid(8);
      const shortUrl = `${envConfig.DOMAIN_NAME}/${urlCode}`;
      const url = new URLModel({longUrl,
        shortUrl,
        urlCode,
      });
      const newUrl = await this.urlRepository.create(url);
      return newUrl;
    } catch (error) {
      console.error('Error creating URL:', error);
      throw error;
    }
  }
}