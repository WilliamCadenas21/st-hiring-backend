import { mobileSettingsService } from '../../services/mobileSettings.service';
import { mobileSettingsRepository } from '../../repository/mobileSettings.repository';
import { updateMobileSettingsMock } from '../mocks/updatedMobileSettings';

jest.mock('../../repository/mobileSettings.repository');

describe('mobileSettings Service', () => {
  const mockRepo = {
    findAll: jest.fn(),
    findByClientId: jest.fn(),
    create: jest.fn(),
    updateByClientId: jest.fn(),
  };

  beforeEach(() => {
    (mobileSettingsRepository as jest.Mock).mockImplementation(() => mockRepo);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMobileSettingsByClientId', () => {
    it('should return settings for valid client id', async () => {
      const mockSettings = {
        clientId: 123,
        deliveryMethods: [],
      };
      mockRepo.findByClientId.mockResolvedValue(mockSettings);

      const service = mobileSettingsService();
      const result = await service.getMobileSettingsByClientId(123);

      expect(mockRepo.findByClientId).toHaveBeenCalledWith(123);
      expect(result).toEqual(mockSettings);
    });

    it('should return null when no settings found', async () => {
      mockRepo.findByClientId.mockResolvedValue(null);

      const service = mobileSettingsService();
      const result = await service.getMobileSettingsByClientId(123);

      expect(mockRepo.findByClientId).toHaveBeenCalledWith(123);
      expect(result).toBeNull();
    });
  });

  describe('createMobileSettings', () => {
    it('should create new settings', async () => {
      const newSettings = {
        clientId: 123,
        deliveryMethods: [],
      };
      mockRepo.create.mockResolvedValue(newSettings);

      const service = mobileSettingsService();
      const result = await service.createMobileSettings(newSettings);

      expect(mockRepo.create).toHaveBeenCalledWith(newSettings);
      expect(result).toEqual(newSettings);
    });
  });

  describe('updateMobileSettings', () => {
    it('should update existing settings', async () => {
      const updatedSettings = {
        clientId: 123,
        deliveryMethods: [{ method: 'email' }],
      };
      mockRepo.updateByClientId.mockResolvedValue(updatedSettings);

      const service = mobileSettingsService();
      const result = await service.updateMobileSettings(123, updatedSettings as any);

      expect(mockRepo.updateByClientId).toHaveBeenCalledWith(123, updatedSettings);
      expect(result).toEqual(updatedSettings);
    });

    it('should return null when trying to update non-existing settings', async () => {
      mockRepo.updateByClientId.mockResolvedValue(null);

      const service = mobileSettingsService();
      const result = await service.updateMobileSettings(123, updateMobileSettingsMock);

      expect(mockRepo.updateByClientId).toHaveBeenCalledWith(123, updateMobileSettingsMock);
      expect(result).toBeNull();
    });
  });
});
