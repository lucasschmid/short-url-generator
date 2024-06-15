import { Router } from 'express';
import { login } from '../controllers/login.controller';
import { register } from '../controllers/register-user.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;