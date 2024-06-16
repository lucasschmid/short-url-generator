import { Request, Response } from 'express';
import { login } from '../../controllers/login.controller';
import * as urlService from '../../services/login.service';

jest.mock('../../services/login.service', () => ({
    authenticateUser: jest.fn(),
}));

describe('login controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it('should authenticate user and return token', async () => {
        const mockToken = 'mockToken123';
        const mockRequestBody = { email: 'test@example.com', password: 'password123' };
        mockRequest.body = mockRequestBody;

        (urlService.authenticateUser as jest.Mock).mockResolvedValue(mockToken);

        await login(mockRequest as Request, mockResponse as Response);

        expect(urlService.authenticateUser).toHaveBeenCalledWith(mockRequestBody.email, mockRequestBody.password);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ token: mockToken });
    });

    it('should handle authentication failure', async () => {
        const mockErrorMessage = 'Invalid credentials';
        const mockRequestBody = { email: 'test@example.com', password: 'wrongpassword' };
        mockRequest.body = mockRequestBody;

        (urlService.authenticateUser as jest.Mock).mockRejectedValue(new Error(mockErrorMessage));

        await login(mockRequest as Request, mockResponse as Response);

        expect(urlService.authenticateUser).toHaveBeenCalledWith(mockRequestBody.email, mockRequestBody.password);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: mockErrorMessage });
    });
});
