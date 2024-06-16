import { Request, Response } from 'express';
import * as urlService from '../services/redirect-url.service';

export const redirectToUrl = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

  try {
    const originalUrl = await urlService.redirectToUrl(shortUrl);
    res.redirect(originalUrl);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};