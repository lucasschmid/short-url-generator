import { Request, Response } from 'express';
import { updateUrl } from '../../controllers/update-url.controller';
import * as urlService from '../../services/index.service';

jest.mock('../../services/update-url.service', () => ({
    updateUrl: jest.fn(),
}));

describe('updateUrl controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {
            params: { id: '1' },
            body: { originalUrl: 'https://updated-url.com' },
            user: { id: 1 },
        };
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    it('should update a URL and respond with the updated URL', async () => {
        const mockUpdatedUrl = {
            id: 1,
            originalUrl: 'https://updated-url.com',
            shortUrl: 'http://localhost/aBcDeF',
            clicks: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        (urlService.updateUrl as jest.Mock).mockResolvedValue(mockUpdatedUrl);

        await updateUrl(mockRequest as Request, mockResponse as Response);

        expect(mockRequest.params).toBeDefined();
        expect(mockRequest.params?.id).toEqual('1');

        expect(urlService.updateUrl).toHaveBeenCalledWith(
            Number(mockRequest.params?.id),
            mockRequest.body.originalUrl,
            mockRequest.user?.id
        );
        expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedUrl);
    });

    it('should handle error during URL update and respond with status 404', async () => {
        const mockErrorMessage = 'URL not found';
        (urlService.updateUrl as jest.Mock).mockRejectedValue(new Error(mockErrorMessage));

        await updateUrl(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: mockErrorMessage });
    });
});
