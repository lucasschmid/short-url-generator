import { Url } from '../models/index.model';

export async function deleteUrl(id: number, userId: number | null) {
    try {
        const url = await Url.findOne({ where: { id, userId, deletedAt: null } });

        if (!url) {
            throw new Error('URL not found');
        }

        await Url.update({ deletedAt: new Date() }, { where: { id } });

        return true;
    } catch (error) {
        throw new Error('Failed to delete URL');
    }
}