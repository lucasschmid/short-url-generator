import { Request, Response } from 'express';
import { listUrl } from '../../controllers/index.controller';
import * as urlService from '../../services/list-urls.service';

jest.mock('../../services/list-urls.service', () => ({
    urlsList: jest.fn(),
}));

describe('listUrl function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return list of URLs for authenticated user', async () => {
        const mockUrls = [
            { id: 1, originalUrl: 'http://example.com', shortUrl: 'aBcDeF', clicks: 10, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, originalUrl: 'http://another-example.com', shortUrl: 'xYzAbC', clicks: 5, createdAt: new Date(), updatedAt: new Date() },
        ];

        const mockRequest = {
            user: { id: 1 },
        } as Request;

        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;

        (urlService.urlsList as jest.Mock).mockResolvedValue(mockUrls);
        await listUrl(mockRequest, mockResponse);

        expect(urlService.urlsList).toHaveBeenCalledWith(1);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUrls);
    });

    it('should return 500 status and error message for unauthorized user', async () => {
        const mockRequest = {
            user: undefined,
        } as Request;

        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;

        await listUrl(mockRequest, mockResponse);
        
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should return 500 status and error message for service failure', async () => {
        const mockRequest = {
            user: { id: 1 },
        } as Request;

        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;

        (urlService.urlsList as jest.Mock).mockRejectedValue(new Error('Service error'));

        await listUrl(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Service error' });
    });
});
