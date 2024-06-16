import { Url } from '../models/index.model';

export async function updateUrl(id: number, originalUrl: string, userId: number | null) {
    try {
        const url = await Url.findOne({ where: { id, userId, deletedAt: null } });

        if (!url) {
            throw new Error();
        }

        url.originalUrl = originalUrl;
        await url.save();

        return url;
    } catch (error) {
        throw new Error('Failed to update URL');
    }
}