import { MobileSettings } from '../entity/mobileSettings.entity';

export interface IMobileSettingsRepository {
  findAll(): Promise<MobileSettings[]>;
  findByClientId?(clientId: number): Promise<MobileSettings | null>;
  create(mobileSettings: MobileSettings): Promise<MobileSettings>;
  updateByClientId(clientId: number, updateData: Partial<MobileSettings>): Promise<MobileSettings | null>;
}
