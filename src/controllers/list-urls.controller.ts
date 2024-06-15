import { Request, Response } from 'express';
import * as urlService from '../services/list-urls.service';

export const listUrl = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            throw new Error('Unauthorized');
        }

        const userId = req.user.id;
        const urls = await urlService.urlsList(userId);

        res.json(urls);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message || 'An error occurred' });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};