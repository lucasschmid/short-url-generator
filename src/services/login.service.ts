import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.model';

export async function authenticateUser(email: string, password: string) {
    try {
        const user = await User.findOne({ where: { email } });
        const { JWT_SECRET } = process.env;
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error("");
        }
        if (!JWT_SECRET) {
            throw new Error("");
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw new Error('Invalid email or password');
    }
  };