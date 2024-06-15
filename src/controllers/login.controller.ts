import { Request, Response } from 'express';
import * as urlService from '../services/login.service';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await urlService.authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};