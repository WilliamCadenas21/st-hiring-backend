import { MobileSettings } from '../entity/mobileSettings.entity';

export interface IMobileSettingsRepository {
  findAll(): Promise<MobileSettings[]>;
  findByClientId(clientId: string): Promise<MobileSettings | null>;
  create(mobileSettings: MobileSettings): Promise<MobileSettings>;
  updateByClientId(clientId: string, updateData: Partial<MobileSettings>): Promise<MobileSettings | null>;
}
