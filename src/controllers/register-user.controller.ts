import { Request, Response } from 'express';
import * as urlService from '../services/register-user.service';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await urlService.registerUser( email, password );
      res.status(201).json({ user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };