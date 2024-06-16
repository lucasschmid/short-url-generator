import { deleteUrl } from '../../services/index.service';
import { Url } from '../../models/index.model';

jest.mock('../../models/index.model', () => ({
    Url: {
        findOne: jest.fn(),
        update: jest.fn(),
    },
}));

describe('deleteUrl', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete URL when found and update deletedAt field', async () => {
        const id = 1;
        const userId = 1;
        const mockUrl = { id: 1, userId: 1, deletedAt: null };
        (Url.findOne as jest.Mock).mockResolvedValueOnce(mockUrl);

        (Url.update as jest.Mock).mockResolvedValueOnce([1]);
        const result = await deleteUrl(id, userId);

        expect(result).toBe(true);
        expect(Url.findOne).toHaveBeenCalledWith({ where: { id, userId, deletedAt: null } });
        expect(Url.update).toHaveBeenCalledWith({ deletedAt: expect.any(Date) }, { where: { id } });
    });

    it('should throw generic error when update fails', async () => {
        const id = 1;
        const userId = 1;
        const mockUrl = { id: 1, userId: 1, deletedAt: null };

        (Url.findOne as jest.Mock).mockResolvedValueOnce(mockUrl);
        (Url.update as jest.Mock).mockRejectedValueOnce(new Error('Update failed'));

        await expect(deleteUrl(id, userId)).rejects.toThrow('Failed to delete URL');
        expect(Url.findOne).toHaveBeenCalledWith({ where: { id, userId, deletedAt: null } });
        expect(Url.update).toHaveBeenCalledWith({ deletedAt: expect.any(Date) }, { where: { id } });
    });
});
