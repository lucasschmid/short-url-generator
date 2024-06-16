import { Request, Response } from 'express';
import { register } from '../../controllers/register-user.controller';
import * as urlService from '../../services/register-user.service';

jest.mock('../../services/register-user.service', () => ({
    registerUser: jest.fn(),
}));

describe('register controller', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {
            body: { email: 'test@example.com', password: 'password123' },
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it('should create a new user and respond with status 201', async () => {
        const mockUser = { id: 1, email: 'test@example.com' };
        (urlService.registerUser as jest.Mock).mockResolvedValue(mockUser);

        await register(mockRequest as Request, mockResponse as Response);

        expect(urlService.registerUser).toHaveBeenCalledWith(mockRequest.body.email, mockRequest.body.password);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({ user: mockUser });
    });

    it('should handle registration failure and respond with status 400', async () => {
        const mockErrorMessage = 'Email already exists';
        (urlService.registerUser as jest.Mock).mockRejectedValue(new Error(mockErrorMessage));

        await register(mockRequest as Request, mockResponse as Response);

        expect(urlService.registerUser).toHaveBeenCalledWith(mockRequest.body.email, mockRequest.body.password);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: mockErrorMessage });
    });
});
