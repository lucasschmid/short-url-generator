import { redirectToUrl } from '../../services/redirect-url.service';
import { Url } from '../../models/index.model';

jest.mock('../../models/index.model', () => ({
    Url: {
        findOne: jest.fn(),
    },
}));

describe('redirectToUrl function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should redirect to original URL and increment click count', async () => {
        const mockShortUrl = 'abcdef';
        const mockOriginalUrl = 'https://example.com';

        const mockUrlInstance = {
            shortUrl: mockShortUrl,
            originalUrl: mockOriginalUrl,
            click: 0,
            save: jest.fn(),
        };

        (Url.findOne as jest.Mock).mockResolvedValue(mockUrlInstance);

        const originalUrl = await redirectToUrl(mockShortUrl);

        expect(Url.findOne).toHaveBeenCalledWith({ where: { shortUrl: mockShortUrl, deletedAt: null } });
        expect(mockUrlInstance.click).toBe(1);
        expect(mockUrlInstance.save).toHaveBeenCalled();
        expect(originalUrl).toBe(mockOriginalUrl);
    });

    it('should throw an error when short URL is not found', async () => {
        const mockShortUrl = 'invalidShortUrl';

        (Url.findOne as jest.Mock).mockResolvedValue(null);

        await expect(redirectToUrl(mockShortUrl)).rejects.toThrow('Failed to redirect to URL');

        expect(Url.findOne).toHaveBeenCalledWith({ where: { shortUrl: mockShortUrl, deletedAt: null } });
    });

    it('should throw an error when an unexpected error occurs', async () => {
        const mockShortUrl = 'abcdef';

        (Url.findOne as jest.Mock).mockRejectedValue(new Error('Unexpected error'));

        await expect(redirectToUrl(mockShortUrl)).rejects.toThrow('Failed to redirect to URL');

        expect(Url.findOne).toHaveBeenCalledWith({ where: { shortUrl: mockShortUrl, deletedAt: null } });
    });
});
