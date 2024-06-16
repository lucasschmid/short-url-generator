import { authenticateUser } from '../../services/login.service';
import { User } from '../../models/index.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../../models/index.model', () => ({
    User: {
        findOne: jest.fn(),
    },
}));

jest.mock('bcryptjs', () => ({
    __esModule: true,
    default: {
        hash: jest.fn(),
        compare: jest.fn(),
    },
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

describe('authenticateUser function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error for invalid credentials', async () => {
        const mockUser = {
            id: 1,
            email: 'test@example.com',
            password: await bcrypt.hash('password', 10),
        };

        (User.findOne as jest.Mock).mockResolvedValue(mockUser);

        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await expect(authenticateUser(mockUser.email, 'wrongpassword')).rejects.toThrow('Invalid email or password');

        expect(User.findOne).toHaveBeenCalledWith({ where: { email: mockUser.email } });
        expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', mockUser.password);
        expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should throw an error if user is not found', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null);

        await expect(authenticateUser('nonexistent@example.com', 'password')).rejects.toThrow('Invalid email or password');

        expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'nonexistent@example.com' } });
        expect(bcrypt.compare).not.toHaveBeenCalled();
        expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should throw an error if JWT_SECRET is not defined', async () => {
        (User.findOne as jest.Mock).mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashedpassword' });

        (bcrypt.compare as jest.Mock).mockResolvedValue(true);

        process.env.JWT_SECRET = '';

        await expect(authenticateUser('test@example.com', 'password')).rejects.toThrow('Invalid email or password');

        expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
        expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedpassword');
        expect(jwt.sign).not.toHaveBeenCalled();
    });
});
