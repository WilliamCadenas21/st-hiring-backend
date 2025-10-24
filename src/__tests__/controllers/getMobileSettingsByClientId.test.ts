import { Request, Response } from 'express';
import { getMobileSettingsByClientId } from '../../controllers/getMobileSettingsByClientId.controller';
import { mobileSettingsService } from '../../services/mobileSettings.service';
import { getDefaultMobileSettings } from '../../database/mongo/defaults/defaultMobileSettings';

// Mock dependencies
jest.mock('../../services/mobileSettings.service');
jest.mock('../../database/mongo/defaults/defaultMobileSettings');

describe('getMobileSettingsByClientId Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    mockRequest = {
      query: { clientId: '123' },
    };
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return existing settings when found', async () => {
    const mockSettings = {
      clientId: 123,
      deliveryMethods: [],
      // ... other fields
    };

    // Mock service response
    const mockGetSettings = jest.fn().mockResolvedValue(mockSettings);
    (mobileSettingsService as jest.Mock).mockImplementation(() => ({
      getMobileSettingsByClientId: mockGetSettings,
    }));

    await getMobileSettingsByClientId()(mockRequest as Request, mockResponse as Response);

    expect(mockGetSettings).toHaveBeenCalledWith(123);
    expect(mockJson).toHaveBeenCalledWith(mockSettings);
  });

  it('should create default settings when not found', async () => {
    const mockDefaultSettings = {
      clientId: 123,
      deliveryMethods: [],
      // ... other fields
    };

    // Mock service responses
    const mockGetSettings = jest.fn().mockResolvedValue(null);
    const mockCreateSettings = jest.fn().mockResolvedValue(mockDefaultSettings);
    (mobileSettingsService as jest.Mock).mockImplementation(() => ({
      getMobileSettingsByClientId: mockGetSettings,
      createMobileSettings: mockCreateSettings,
    }));

    (getDefaultMobileSettings as jest.Mock).mockReturnValue(mockDefaultSettings);

    await getMobileSettingsByClientId()(mockRequest as Request, mockResponse as Response);

    expect(mockGetSettings).toHaveBeenCalledWith(123);
    expect(getDefaultMobileSettings).toHaveBeenCalledWith(123);
    expect(mockCreateSettings).toHaveBeenCalledWith(mockDefaultSettings);
    expect(mockJson).toHaveBeenCalledWith(mockDefaultSettings);
  });

  it('should handle errors gracefully', async () => {
    const mockError = new Error('Database error');
    (mobileSettingsService as jest.Mock).mockImplementation(() => ({
      getMobileSettingsByClientId: jest.fn().mockRejectedValue(mockError),
    }));

    await getMobileSettingsByClientId()(mockRequest as Request, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });
  });
});
