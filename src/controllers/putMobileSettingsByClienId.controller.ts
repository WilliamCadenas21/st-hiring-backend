import { Request, Response } from 'express';
import { mobileSettingsService } from '../services/mobileSettings.service';

export const putMobileSettingsByClientId = () => {
  return async (_req: Request, res: Response) => {
    try {
      const body = _req.body;
      console.log('Received body for update:', body);
      const settings = await mobileSettingsService().updateMobileSettings(body.clientId, body);
      if(!settings) {
        return res.status(404).json({ message: `Mobile settings not found for the given clientId ${body.clientId}` });
      }
      return res.json(settings);
    } catch (error) {
      console.error('Error fetching mobile settings:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
