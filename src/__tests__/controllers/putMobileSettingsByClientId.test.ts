import { Request, Response } from 'express';
import { putMobileSettingsByClientId } from '../../controllers/putMobileSettingsByClienId.controller';
import { mobileSettingsService } from '../../services/mobileSettings.service';

jest.mock('../../services/mobileSettings.service');

describe('putMobileSettingsByClientId controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();
    mockReq = {
      body: {
        clientId: 123,
        scanning: { scanManually: true },
      },
    };
    mockRes = {
      json: jsonMock,
      status: statusMock,
    };
    jest.clearAllMocks();
  });

  it('returns updated settings on success', async () => {
    const updated = { clientId: 123, scanning: { scanManually: true }, deliveryMethods: [] };
    const updateMock = jest.fn().mockResolvedValue(updated);
    (mobileSettingsService as jest.Mock).mockImplementation(() => ({ updateMobileSettings: updateMock }));

    await putMobileSettingsByClientId()(mockReq as Request, mockRes as Response);

    expect(updateMock).toHaveBeenCalledWith(123, mockReq!.body);
    expect(jsonMock).toHaveBeenCalledWith(updated);
  });

  it('returns 404 when settings not found', async () => {
    const updateMock = jest.fn().mockResolvedValue(null);
    (mobileSettingsService as jest.Mock).mockImplementation(() => ({ updateMobileSettings: updateMock }));

    await putMobileSettingsByClientId()(mockReq as Request, mockRes as Response);

    expect(updateMock).toHaveBeenCalledWith(123, mockReq!.body);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({
      message: `Mobile settings not found for the given clientId ${mockReq!.body.clientId}`,
    });
  });

  it('returns 500 on service error', async () => {
    const updateMock = jest.fn().mockRejectedValue(new Error('db error'));
    (mobileSettingsService as jest.Mock).mockImplementation(() => ({ updateMobileSettings: updateMock }));

    await putMobileSettingsByClientId()(mockReq as Request, mockRes as Response);

    expect(updateMock).toHaveBeenCalledWith(123, mockReq!.body);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
