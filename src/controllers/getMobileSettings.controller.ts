import { Request, Response } from 'express';
import { mobileSettingsService } from '../services/mobileSettings.service';

export const getMobileSettings = () => async (_req: Request, res: Response) => {
  try {
      const settings = await mobileSettingsService().getAllMobileSettings();
      res.json(settings);
  }
  catch (error) {
      console.error('Error fetching mobile settings:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};
