import { Request, Response } from 'express';
import { mobileSettingsService } from '../services/mobileSettings.service';

export const getMobileSettingsByClientId = () => async (_req: Request, res: Response) => {
  try {
    const clientId = _req.query.clientId;
    //TODO add validations for clientId
    const settings = await mobileSettingsService().getMobileSettingsByClientId(clientId as string);

    if (!settings) {
      res.status(404).json({ message: 'Mobile settings not found for the given clientId' });
    }

    res.json(settings);
  } catch (error) {
    console.error('Error fetching mobile settings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
