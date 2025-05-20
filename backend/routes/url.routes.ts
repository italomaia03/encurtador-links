import { NextFunction, Request, Response, Router } from "express";
import { URLService } from "../services/url.service";
import { UrlRepository } from "../repositories/url.repository";
import { URLController } from "../controllers/url.controller";

export const router = Router();
const urlRepository = new UrlRepository();
const urlService = new URLService(urlRepository)
const urlController = new URLController(urlService);

router.post("/shorten-url", (req: Request, res: Response, next: NextFunction) => urlController.createShortUrl(req, res, next));
router.get("/:urlCode", (req: Request, res: Response, next: NextFunction) => urlController.getLongUrl(req, res, next));