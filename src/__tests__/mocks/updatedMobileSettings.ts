export const updateMobileSettingsMock = {
  deliveryMethods: [
    {
      name: 'Test Method',
      enum: 'TEST',
      order: 1,
      isDefault: true,
      selected: true,
    },
  ],
  clientId: 0,
  fulfillmentFormat: {
    rfid: false,
    print: false,
  },
  printer: {
    id: '',
  },
  printingFormat: {
    formatA: false,
    formatB: false,
  },
  scanning: {
    scanManually: false,
    scanWhenComplete: false,
  },
  paymentMethods: {
    cash: false,
    creditCard: false,
    comp: false,
  },
  ticketDisplay: {
    leftInAllotment: false,
    soldOut: false,
  },
  customerInfo: {
    active: false,
    basicInfo: false,
    addressInfo: false,
  },
};
