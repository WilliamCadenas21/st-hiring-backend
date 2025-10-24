import mongoose, { Schema } from 'mongoose';

const deliveryMethodsSchema = new Schema({
  name: { type: String, required: true },
  enum: { type: String, required: true },
  order: { type: Number, required: true },
  isDefault: { type: Boolean, required: true },
  selected: { type: Boolean, required: true },
});

const mobileConfig = new Schema({
  clientId: { type: Number, required: true, unique: true },
  deliveryMethods: {
    type: Array,
    required: true,
    items: deliveryMethodsSchema,
  },
  fulfillmentFormat: { rfid: { type: Boolean, required: true }, print: { type: Boolean, required: true } },
  printer: {
    id: { type: String, required: true },
  },
  printingFormat: { formatA: { type: Boolean, required: true }, formatB: { type: Boolean, required: true } },
  scanning: {
    scanManually: { type: Boolean, required: true },
    scanWhenComplete: { type: Boolean, required: true },
  },
  paymentMethods: {
    cash: { type: Boolean, required: true },
    creditCard: { type: Boolean, required: true },
    comp: { type: Boolean, required: true },
  },
  ticketDisplay: {
    leftInAllotment: { type: Boolean, required: true },
    soldOut: { type: Boolean, required: true },
  },
  customerInfo: {
    active: { type: Boolean, required: true },
    basicInfo: { type: Boolean, required: true },
    addressInfo: { type: Boolean, required: true },
  },
});

const mobileConfigModel = mongoose.model('mobile-config', mobileConfig);

export default mobileConfigModel;
