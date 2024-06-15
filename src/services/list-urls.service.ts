import { Url } from '../models/index.model';

export async function urlsList(userId: number) {
    try {
        const { BASE_URL } = process.env;
        const urls = await Url.findAll({
            where: { userId, deletedAt: null },
            attributes: ['id', 'originalUrl', 'shortUrl', 'click', 'createdAt', 'updatedAt'],
        });

        const result = urls.map(url => ({
            id: url.id,
            originalUrl: url.originalUrl,
            shortUrl: `${BASE_URL}/${url.shortUrl}`,
            clicks: url.click,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt,
        }));

        return result;
    } catch (error) {
        throw new Error('Failed to fetch URLs');
    }
}