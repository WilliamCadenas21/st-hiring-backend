import Joi from 'joi';

const deliveryMethodSchema = Joi.object({
  name: Joi.string().required(),
  enum: Joi.string().required(),
  order: Joi.number().integer().required(),
  isDefault: Joi.boolean().required(),
  selected: Joi.boolean().required(),
});

export const UpdateMobileSettingsSchema = Joi.object({
  clientId: Joi.number().integer().positive().required(),
  deliveryMethods: Joi.array().items(deliveryMethodSchema).min(1).required(),
  fulfillmentFormat: Joi.object({
    rfid: Joi.boolean().required(),
    print: Joi.boolean().required(),
  }).required(),
  printer: Joi.object({
    id: Joi.string().required(),
  }).required(),
  printingFormat: Joi.object({
    formatA: Joi.boolean().required(),
    formatB: Joi.boolean().required(),
  }).required(),
  scanning: Joi.object({
    scanManually: Joi.boolean().required(),
    scanWhenComplete: Joi.boolean().required(),
  }).required(),
  paymentMethods: Joi.object({
    cash: Joi.boolean().required(),
    creditCard: Joi.boolean().required(),
    comp: Joi.boolean().required(),
  }).required(),
  ticketDisplay: Joi.object({
    leftInAllotment: Joi.boolean().required(),
    soldOut: Joi.boolean().required(),
  }).required(),
  customerInfo: Joi.object({
    active: Joi.boolean().required(),
    basicInfo: Joi.boolean().required(),
    addressInfo: Joi.boolean().required(),
  }).required(),
});
