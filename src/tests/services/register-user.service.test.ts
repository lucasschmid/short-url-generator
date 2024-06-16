import { User } from '../../models/index.model';
import { registerUser } from '../../services/register-user.service';

jest.mock('../../models/index.model', () => ({
    User: {
        create: jest.fn(),
    },
}));

describe('registerUser function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a user when provided valid email and password', async () => {
        const mockEmail = 'test@example.com';
        const mockPassword = 'password';

        const mockHashedPassword = expect.any(String);

        const mockUser = {
            id: 1,
            email: mockEmail,
            password: mockHashedPassword,
        };

        (User.create as jest.Mock).mockResolvedValue(mockUser);

        const registeredUser = await registerUser(mockEmail, mockPassword);

        expect(User.create).toHaveBeenCalledWith({ email: mockEmail, password: expect.any(String) });
        expect(registeredUser).toEqual(mockUser);
    });

    it('should throw an error when registration fails', async () => {
        const mockEmail = 'test@example.com';
        const mockPassword = 'password';

        const mockErrorMessage = 'Database error';

        (User.create as jest.Mock).mockRejectedValue(new Error(mockErrorMessage));

        await expect(registerUser(mockEmail, mockPassword)).rejects.toThrow('Error registering user');

        expect(User.create).toHaveBeenCalledWith({ email: mockEmail, password: expect.any(String) });
    });
});
