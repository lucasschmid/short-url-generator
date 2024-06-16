import { urlsList } from '../../services/list-urls.service';
import { Url } from '../../models/index.model';

jest.mock('../../models/index.model', () => ({
    Url: {
        findAll: jest.fn(),
    },
}));

describe('urlsList service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch URLs successfully', async () => {
        const mockBaseUrl = 'http://localhost';
        process.env.BASE_URL = mockBaseUrl;

        const mockUrls = [
            { id: 1, originalUrl: 'http://example.com', shortUrl: 'aBcDeF', click: 10, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, originalUrl: 'http://another-example.com', shortUrl: 'xYzAbC', click: 5, createdAt: new Date(), updatedAt: new Date() },
        ];

        (Url.findAll as jest.Mock).mockResolvedValue(mockUrls);

        const userId = 1;
        const result = await urlsList(userId);

        expect(result).toEqual([
            { id: 1, originalUrl: 'http://example.com', shortUrl: `${mockBaseUrl}/aBcDeF`, clicks: 10, createdAt: expect.any(Date), updatedAt: expect.any(Date) },
            { id: 2, originalUrl: 'http://another-example.com', shortUrl: `${mockBaseUrl}/xYzAbC`, clicks: 5, createdAt: expect.any(Date), updatedAt: expect.any(Date) },
        ]);
        expect(Url.findAll).toHaveBeenCalledWith({
            where: { userId, deletedAt: null },
            attributes: ['id', 'originalUrl', 'shortUrl', 'click', 'createdAt', 'updatedAt'],
        });
    });

    it('should throw an error when fetching URLs fails', async () => {
        (Url.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

        const userId = 1;

        await expect(urlsList(userId)).rejects.toThrow('Failed to fetch URLs');
        expect(Url.findAll).toHaveBeenCalledWith({
            where: { userId, deletedAt: null },
            attributes: ['id', 'originalUrl', 'shortUrl', 'click', 'createdAt', 'updatedAt'],
        });
    });
});
