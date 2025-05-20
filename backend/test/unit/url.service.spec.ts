import { afterEach, beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { nanoid } from 'nanoid';
import { Prisma } from '@prisma/client';
import { envConfig } from '../../config/env.config';
import { URLModel } from '../../models/url.model';
import { UrlRepository } from '../../repositories/url.repository';
import { URLService } from '../../services/url.service';
import { BadRequestError } from '../../errors/bad-request.error';
import { UrlAlreadyExistsError } from '../../errors/url-already-exists.error';

describe('URLService', () => {
  let urlService: URLService;
  let urlRepository: Mocked<UrlRepository>;
  let urlCode: string;
  let longUrl: string;

  beforeEach(() => {
    vi.mock('nanoid');
    vi.mock('../models/url.model');
    vi.mock('../config/env', () => ({
      envConfig: {
        DOMAIN_NAME: 'https://short.url',
      },
    }));

    urlRepository = {
      create: vi.fn(),
      findByUrlCode: vi.fn(),
    };

    urlService = new URLService(urlRepository);

    urlCode = 'abc123';
    longUrl = 'https://example.com';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('createShortUrl', () => {
    it('should create a short URL', async () => {
      const mockUrl = new URLModel({
        longUrl,
        shortUrl: `${envConfig.DOMAIN_NAME}/${urlCode}`,
        urlCode: urlCode,
      });

      const mockCreatedUrl = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        longUrl,
        shortUrl: `${envConfig.DOMAIN_NAME}/${urlCode}`,
        urlCode,
      };

      vi.mocked(nanoid).mockReturnValue(urlCode);
      urlRepository.create.mockResolvedValue(mockCreatedUrl);

      const result = await urlService.createShortUrl(mockUrl.longUrl);

      expect(nanoid).toHaveBeenCalledWith(8);
      expect(urlRepository.create).toHaveBeenCalledWith(mockUrl);
      expect(result).toEqual(mockCreatedUrl);
    });

    it('should throw an error if URL creation fails', async () => {
       urlRepository.create.mockRejectedValue(new UrlAlreadyExistsError('URL code already exists'));

      await expect(urlService.createShortUrl(longUrl)).rejects.toThrow(BadRequestError);
      expect(urlRepository.create).toHaveBeenCalled();
    });

    it('should throw an error if long url is not provided', async () => {
      await expect(urlService.createShortUrl(' ')).rejects.toThrow(BadRequestError);
    });
  });

  describe('getLongUrl', () => {
    it('should retrieve the long URL', async () => {
      const mockFoundUrl = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        longUrl,
        shortUrl: `${envConfig.DOMAIN_NAME}/${urlCode}`,
        urlCode,
      };
      urlRepository.findByUrlCode.mockResolvedValue(mockFoundUrl);
      const result = await urlService.getLongUrl(urlCode);
      expect(urlRepository.findByUrlCode).toHaveBeenCalledWith(urlCode);
      expect(result).toEqual(longUrl);
    });

    it('should throw an error if URL not found', async () => {
      urlRepository.findByUrlCode.mockResolvedValue(null);

      await expect(urlService.getLongUrl(urlCode)).rejects.toThrow('URL not found');
      expect(urlRepository.findByUrlCode).toHaveBeenCalledWith(urlCode);
    });
  });

  it('should throw an error if URL code is not provided', async () => {
    await expect(urlService.getLongUrl('')).rejects.toThrow(BadRequestError);
  })

  it('should throw an error if long URL is not found', async () => {
    await expect(urlService.getLongUrl('nonexistentCode')).rejects.toThrow('URL not found');
    urlRepository.findByUrlCode.mockResolvedValue(null);
    await expect(urlService.getLongUrl('nonexistentCode')).rejects.toThrow('URL not found');
    expect(urlRepository.findByUrlCode).toHaveBeenCalledWith('nonexistentCode');
  })
});
