import { Request, Response } from 'express';
import { mobileSettingsService } from '../services/mobileSettings.service';
import { getDefaultMobileSettings } from '../database/mongo/defaults/defaultMobileSettings';

export const getMobileSettingsByClientId = () => {
  return async (_req: Request, res: Response) => {
    try {
      const clientId = Number(_req.query.clientId);
      const settings = await mobileSettingsService().getMobileSettingsByClientId(clientId);

      if (!settings) {
        const defaultSettings = getDefaultMobileSettings(clientId);
        const createdSettings = await mobileSettingsService().createMobileSettings(defaultSettings);
        return res.json(createdSettings);
      }

      return res.json(settings);
    } catch (error) {
      console.error('Error fetching mobile settings:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};
