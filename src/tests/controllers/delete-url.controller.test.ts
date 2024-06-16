import { Request, Response } from 'express';
import { deleteUrl } from '../../controllers/index.controller';
import * as urlService from '../../services/delete-url.service';

jest.mock('../../services/delete-url.service');

describe('deleteUrl function', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      params: { id: '1' },
      user: { id: 1 },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('should delete URL and return 204 status', async () => {
    const mockDeleteUrl = jest.spyOn(urlService, 'deleteUrl').mockResolvedValue(true);

    await deleteUrl(mockRequest as Request, mockResponse as Response);

    expect(mockDeleteUrl).toHaveBeenCalledWith(1, 1);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
    expect(mockResponse.end).toHaveBeenCalled();
  });

  it('should return 404 if URL not found', async () => {
    const mockDeleteUrl = jest.spyOn(urlService, 'deleteUrl').mockResolvedValue(false);

    await deleteUrl(mockRequest as Request, mockResponse as Response);

    expect(mockDeleteUrl).toHaveBeenCalledWith(1, 1);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'URL not found' });
  });

  it('should handle errors and return 500 status', async () => {
    const errorMessage = 'Error deleting URL';
    const mockDeleteUrl = jest.spyOn(urlService, 'deleteUrl').mockRejectedValue(new Error(errorMessage));

    await deleteUrl(mockRequest as Request, mockResponse as Response);

    expect(mockDeleteUrl).toHaveBeenCalledWith(1, 1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
