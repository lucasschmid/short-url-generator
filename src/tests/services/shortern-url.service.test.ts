import { shortenUrl } from '../../services/shorten-url.service';
import { Url } from '../../models/index.model';
import { generateShortUrl } from '../../utils/generateShortUrl';

jest.mock('../../models/index.model', () => ({
    Url: {
        create: jest.fn(),
    },
}));

jest.mock('../../utils/generateShortUrl', () => ({
    generateShortUrl: jest.fn().mockReturnValue('abc123'),
}));

describe('shortenUrl function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should shorten a URL when provided valid originalUrl and userId', async () => {
        const mockOriginalUrl = 'https://example.com/test';
        const mockUserId = 1;
        const mockShortUrl = 'abc123';
        const mockBaseUrl = 'http://localhost';

        process.env.BASE_URL = mockBaseUrl;

        const mockUrlInstance = {
            originalUrl: mockOriginalUrl,
            shortUrl: mockShortUrl,
            userId: mockUserId,
        };

        (Url.create as jest.Mock).mockResolvedValue(mockUrlInstance);

        const shortenedUrl = await shortenUrl(mockOriginalUrl, mockUserId);

        expect(generateShortUrl).toHaveBeenCalled();
        expect(Url.create).toHaveBeenCalledWith({ originalUrl: mockOriginalUrl, shortUrl: mockShortUrl, userId: mockUserId });
        expect(shortenedUrl).toEqual(`${mockBaseUrl}/${mockShortUrl}`);
    });

    it('should throw an error when failing to shorten a URL', async () => {
        const mockOriginalUrl = 'https://example.com/test';
        const mockUserId = 1;

        const mockErrorMessage = 'Database error';

        process.env.BASE_URL = 'http://localhost';

        (Url.create as jest.Mock).mockRejectedValue(new Error(mockErrorMessage));

        await expect(shortenUrl(mockOriginalUrl, mockUserId)).rejects.toThrow('Failed to shorten URL');

        expect(Url.create).toHaveBeenCalledWith({ originalUrl: mockOriginalUrl, shortUrl: 'abc123', userId: mockUserId });
    });
});
