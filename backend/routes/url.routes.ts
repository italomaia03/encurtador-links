import { Request, Response, Router } from "express";
import { URLService } from "../services/url.service";
import { UrlRepository } from "../repositories/url.repository";
import { URLController } from "../controllers/url.controller";

export const router = Router();
const urlRepository = new UrlRepository();
const urlService = new URLService(urlRepository)
const urlController = new URLController(urlService);

router.post("/shorten-url", (req: Request, res: Response) => urlController.createShortUrl(req, res));