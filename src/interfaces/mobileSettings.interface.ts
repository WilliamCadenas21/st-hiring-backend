import { MobileSettings } from '../entity/mobileSettings.entity';

export interface IMobileSettingsRepository {
  findAll(): Promise<MobileSettings[]>;
  findByClientId?(clientId: string): Promise<MobileSettings | null>;
//   create(mobileSettings: MobileSettings): Promise<MobileSettings>;
}
