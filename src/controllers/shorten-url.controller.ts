import { Request, Response } from 'express';
import * as urlService from '../services/shorten-url.service';

export const shortenUrl = async (req: Request, res: Response) => {
  const { originalUrl } = req.body;
  const userId = req.user ? req.user.id : null;
  try {
    if (!originalUrl) {
        throw new Error("Url is empty")
    }
    const shortUrl = await urlService.shortenUrl(originalUrl, userId);
    res.json({ shortUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};