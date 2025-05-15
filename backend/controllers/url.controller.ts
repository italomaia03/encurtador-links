import { Request, Response } from "express";
import { URLService } from "../services/url.service";

export class URLController {
  constructor(private readonly urlService: URLService) {}

  async createShortUrl(req: Request, res: Response) {
    try {
      const { longUrl } = req.body;
      if (!longUrl) {
        res.status(400).json({ error: 'Long URL is required' });
        return;
      }
      const newUrl = await this.urlService.createShortUrl(longUrl);
      res.status(201).json(newUrl);
    } catch (error) {
      console.error('Error creating short URL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getLongUrl(req: Request, res: Response) {
    try {
      const { urlCode } = req.params;
      if (!urlCode) {
        res.status(400).json({ error: 'URL code is required' });
        return;
      }
      const longUrl = await this.urlService.getLongUrl(urlCode);
      res.redirect(302, longUrl);
    } catch (error) {
      console.error('Error retrieving long URL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}