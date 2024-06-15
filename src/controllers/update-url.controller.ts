import { Request, Response } from 'express';
import * as urlService from '../services/update-url.service';

export const updateUrl = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { originalUrl } = req.body;
    const userId = req.user?.id || null;

    try {
        const updatedUrl = await urlService.updateUrl(Number(id), originalUrl, userId);
        res.json(updatedUrl);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An error occurred' });
        }
    }
};
