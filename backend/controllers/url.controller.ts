import { NextFunction, Request, Response } from 'express';
import { URLService } from '../services/url.service';
import { BadRequestError } from '../errors/bad-request.error';

export class URLController {
  constructor(private readonly urlService: URLService) {}

  async createShortUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const { longUrl } = req.body;
      const newUrl = await this.urlService.createShortUrl(longUrl);
      res.status(201).json(newUrl);
    } catch (error) {
      console.error('Error creating short URL:', error);
      next(error)
    }
  }

  async getLongUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const { urlCode } = req.params;
      const longUrl = await this.urlService.getLongUrl(urlCode);
      res.status(200).json({ longUrl });
    } catch (error) {
      console.error('Error retrieving long URL:', error);
      next(error);
    }
  }
}
