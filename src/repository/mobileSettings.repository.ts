import mobileConfigModel from '../database/mongo/models';
import { MobileSettings } from '../entity/mobileSettings.entity';
import { IMobileSettingsRepository } from '../interfaces/mobileSettings.interface';

export const mobileSettingsRepository = (): IMobileSettingsRepository => {
  return {
    async findAll(): Promise<MobileSettings[]> {
      const settings: MobileSettings[] = await mobileConfigModel.find({});
      return settings;
    },
    async findByClientId(clientId: string): Promise<MobileSettings | null> {
      const setting: MobileSettings | null = await mobileConfigModel.findOne({ clientId });
      return setting;
    },
    // async create(mobileSettings: MobileSettings): Promise<MobileSettings> {
    //   const createdSettings: MobileSettings = await mobileConfigModel.create(mobileSettings);
    //   return createdSettings;
    // },
  };
};
