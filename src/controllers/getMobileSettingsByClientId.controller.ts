import { Request, Response } from 'express';
import { mobileSettingsService } from '../services/mobileSettings.service';

export const getMobileSettingsByClientId = () => {
  return async (_req: Request, res: Response) => {
    try {
      const clientId = _req.query.clientId;
      const settings = await mobileSettingsService().getMobileSettingsByClientId(clientId as string);

      if (!settings) {
        //TODO: actually we want to create a default config if not found
        return res.status(404).json({ message: 'Mobile settings not found for the given clientId' });
      }

      return res.json(settings);
    } catch (error) {
      console.error('Error fetching mobile settings:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
