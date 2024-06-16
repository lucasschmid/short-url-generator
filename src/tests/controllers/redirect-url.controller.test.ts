import { Request, Response } from 'express';
import { redirectToUrl } from '../../controllers/redirect-url.controller';
import * as urlService from '../../services/index.service';

jest.mock('../../services/redirect-url.service', () => ({
    redirectToUrl: jest.fn(),
}));

describe('redirectToUrl controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {
            params: { shortUrl: 'aBcDeF' } as any,
        };
        mockResponse = {
            redirect: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it('should redirect to original URL', async () => {
        const mockOriginalUrl = 'http://example.com';
        (urlService.redirectToUrl as jest.Mock).mockResolvedValue(mockOriginalUrl);

        await redirectToUrl(mockRequest as Request, mockResponse as Response);

        expect(urlService.redirectToUrl).toHaveBeenCalledWith(mockRequest.params?.shortUrl);
        expect(mockResponse.redirect).toHaveBeenCalledWith(mockOriginalUrl);
    });

    it('should handle URL not found', async () => {
        const mockErrorMessage = 'Short URL not found';
        (urlService.redirectToUrl as jest.Mock).mockRejectedValue(new Error(mockErrorMessage));

        await redirectToUrl(mockRequest as Request, mockResponse as Response);

        expect(urlService.redirectToUrl).toHaveBeenCalledWith(mockRequest.params?.shortUrl);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: mockErrorMessage });
    });
});
