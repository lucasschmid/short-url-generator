import { Request, Response } from 'express';
import * as urlService from '../services/delete-url.service';

export const deleteUrl = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.id || null;

    try {
        const deleted = await urlService.deleteUrl(Number(id), userId);

        if (!deleted) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.status(204).end();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An error occurred' });
        }
    }
};
