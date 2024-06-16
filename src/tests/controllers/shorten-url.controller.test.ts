import { Request, Response } from 'express';
import { shortenUrl } from '../../controllers/shorten-url.controller';
import * as urlService from '../../services/index.service';

jest.mock('../../services/shorten-url.service', () => ({
    shortenUrl: jest.fn(),
}));

describe('shortenUrl controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {
            body: { originalUrl: 'https://example.com' },
            user: { id: 1 },
        };
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    it('should shorten a URL and respond with the shortened URL', async () => {
        const mockShortUrl = 'http://localhost/aBcDeF';
        (urlService.shortenUrl as jest.Mock).mockResolvedValue(mockShortUrl);

        await shortenUrl(mockRequest as Request, mockResponse as Response);

        expect(urlService.shortenUrl).toHaveBeenCalledWith(mockRequest.body.originalUrl, mockRequest.user.id);
        expect(mockResponse.json).toHaveBeenCalledWith({ shortUrl: mockShortUrl });
    });

    it('should handle empty URL and respond with status 500', async () => {
        mockRequest.body.originalUrl = '';
        await shortenUrl(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Url is empty' });
    });

    it('should handle error during URL shortening and respond with status 500', async () => {
        const mockErrorMessage = 'Failed to shorten URL';
        (urlService.shortenUrl as jest.Mock).mockRejectedValue(new Error(mockErrorMessage));

        await shortenUrl(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: mockErrorMessage });
    });
});
