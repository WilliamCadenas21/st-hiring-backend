import { MobileSettings } from '../entity/mobileSettings.entity';
import { mobileSettingsRepository } from '../repository/mobileSettings.repository';

export const mobileSettingsService = () => {
  return {
    getAllMobileSettings: async () => {
      const configs = await mobileSettingsRepository().findAll();
      return configs;
    },
    getMobileSettingsByClientId: async (clientId: number) => {
      const config = await mobileSettingsRepository().findByClientId(clientId);
      return config;
    },
    createMobileSettings: async (settingsData: any) => {
      const newSettings = await mobileSettingsRepository().create(settingsData);
      return newSettings;
    },
    updateMobileSettings: async (clientId: number, updateData: MobileSettings) => {
      const updatedSettings = await mobileSettingsRepository().updateByClientId(clientId, updateData);
      return updatedSettings;
    },
  };
};
