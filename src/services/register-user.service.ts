import bcrypt from 'bcryptjs';
import { User } from '../models/index.model';

export async function registerUser(email: string, password: string) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        return user;
    } catch (error) {
        throw new Error(`Error registering user`);
    }
}