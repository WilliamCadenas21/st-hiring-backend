import { mobileSettingsRepository } from '../../repository/mobileSettings.repository';
import mobileConfigModel from '../../database/mongo/models';
import { MobileSettings } from '../../entity/mobileSettings.entity';
import { updateMobileSettingsMock } from '../mocks/updatedMobileSettings';

jest.mock('../../database/mongo/models');

describe('mobileSettings Repository', () => {
  const mockSettings: MobileSettings = {
    clientId: 123,
    deliveryMethods: [
      {
        name: 'Test Method',
        enum: 'TEST',
        order: 1,
        isDefault: true,
        selected: true,
      },
    ],
    fulfillmentFormat: { rfid: true, print: false },
    printer: { id: 'printer1' },
    printingFormat: { formatA: true, formatB: false },
    scanning: { scanManually: true, scanWhenComplete: false },
    paymentMethods: { cash: true, creditCard: true, comp: false },
    ticketDisplay: { leftInAllotment: true, soldOut: true },
    customerInfo: { active: true, basicInfo: true, addressInfo: false },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all settings', async () => {
      const mockFind = jest.fn().mockResolvedValue([mockSettings]);
      (mobileConfigModel.find as jest.Mock) = mockFind;

      const repository = mobileSettingsRepository();
      const result = await repository.findAll();

      expect(mockFind).toHaveBeenCalledWith({});
      expect(result).toEqual([mockSettings]);
    });
  });

  describe('findByClientId', () => {
    it('should return settings for valid clientId', async () => {
      const mockFindOne = jest.fn().mockResolvedValue(mockSettings);
      (mobileConfigModel.findOne as jest.Mock) = mockFindOne;

      const repository = mobileSettingsRepository();
      const result = await repository.findByClientId(123);

      expect(mockFindOne).toHaveBeenCalledWith({ clientId: 123 });
      expect(result).toEqual(mockSettings);
    });

    it('should return null when settings not found', async () => {
      const mockFindOne = jest.fn().mockResolvedValue(null);
      (mobileConfigModel.findOne as jest.Mock) = mockFindOne;

      const repository = mobileSettingsRepository();
      const result = await repository.findByClientId(999);

      expect(mockFindOne).toHaveBeenCalledWith({ clientId: 999 });
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return new settings', async () => {
      const toObjectMock = jest.fn().mockReturnValue(mockSettings);
      const mockCreate = jest.fn().mockResolvedValue({
        toObject: toObjectMock,
      });
      (mobileConfigModel.create as jest.Mock) = mockCreate;

      const repository = mobileSettingsRepository();
      const result = await repository.create(mockSettings);

      expect(mockCreate).toHaveBeenCalledWith(mockSettings);
      expect(toObjectMock).toHaveBeenCalled();
      expect(result).toEqual(mockSettings);
    });
  });

  describe('updateByClientId', () => {
    it('should update and return settings when found', async () => {
      const updatedSettings = { ...mockSettings, ...updateMobileSettingsMock };
      const toObjectMock = jest.fn().mockReturnValue(updatedSettings);

      const mockFindOneAndUpdate = jest.fn().mockResolvedValue({
        toObject: toObjectMock,
      });
      (mobileConfigModel.findOneAndUpdate as jest.Mock) = mockFindOneAndUpdate;

      const repository = mobileSettingsRepository();
      const result = await repository.updateByClientId(123, updateMobileSettingsMock);

      expect(mockFindOneAndUpdate).toHaveBeenCalledWith({ clientId: 123 }, updateMobileSettingsMock, { new: true });
      expect(toObjectMock).toHaveBeenCalled();
      expect(result).toEqual(updatedSettings);
    });

    it('should return null when settings not found for update', async () => {
      const mockFindOneAndUpdate = jest.fn().mockResolvedValue(null);
      (mobileConfigModel.findOneAndUpdate as jest.Mock) = mockFindOneAndUpdate;

      const repository = mobileSettingsRepository();
      const result = await repository.updateByClientId(999, updateMobileSettingsMock);

      expect(mockFindOneAndUpdate).toHaveBeenCalledWith({ clientId: 999 }, updateMobileSettingsMock, { new: true });
      expect(result).toBeNull();
    });
  });
});
