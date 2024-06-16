import { updateUrl } from '../../services/update-url.service';
import { Url } from '../../models/index.model';

jest.mock('../../models/index.model', () => ({
    Url: {
        findOne: jest.fn(),
    },
}));

describe('updateUrl function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update a URL when provided valid id, originalUrl, and userId', async () => {
        const mockId = 1;
        const mockOriginalUrl = 'https://updated-url.com';
        const mockUserId = 1;

        const mockUrlInstance = {
            id: mockId,
            originalUrl: 'https://old-url.com',
            userId: mockUserId,
            deletedAt: null,
            save: jest.fn().mockResolvedValue(undefined),
        };

        (Url.findOne as jest.Mock).mockResolvedValue(mockUrlInstance);

        const updatedUrl = await updateUrl(mockId, mockOriginalUrl, mockUserId);

        expect(Url.findOne).toHaveBeenCalledWith({ where: { id: mockId, userId: mockUserId, deletedAt: null } });
        expect(mockUrlInstance.originalUrl).toEqual(mockOriginalUrl);
        expect(mockUrlInstance.save).toHaveBeenCalled();
        expect(updatedUrl).toEqual(mockUrlInstance);
    });

    it('should throw an error when URL is not found', async () => {
        const mockId = 1;
        const mockOriginalUrl = 'https://updated-url.com';
        const mockUserId = 1;

        (Url.findOne as jest.Mock).mockResolvedValue(undefined);

        await expect(updateUrl(mockId, mockOriginalUrl, mockUserId)).rejects.toThrow('Failed to update URL');
        expect(Url.findOne).toHaveBeenCalledWith({ where: { id: mockId, userId: mockUserId, deletedAt: null } });
    });
});
