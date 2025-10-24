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
    async create(mobileSettings: MobileSettings): Promise<MobileSettings> {
      const created = await mobileConfigModel.create(mobileSettings);
      return created.toObject() as MobileSettings;
    },
    updateByClientId: async (clientId: string, updateData: Partial<MobileSettings>): Promise<MobileSettings | null> => {
      const updatedSetting = await mobileConfigModel.findOneAndUpdate(
        { clientId },
        updateData,
        { new: true }
      );
      return updatedSetting ? (updatedSetting.toObject() as MobileSettings) : null;
    },
  };
};
