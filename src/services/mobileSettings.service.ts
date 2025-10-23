import { mobileSettingsRepository } from '../repository/mobileSettings.repository';

export const mobileSettingsService = () => {
  return {
    getAllMobileSettings: async () => {
      const configs = await mobileSettingsRepository().findAll();
      return configs;
    },
    getMobileSettingsByClientId: async (clientId: string) => {
      const config = await mobileSettingsRepository().findByClientId(clientId);
      return config;
    }
  };
};
