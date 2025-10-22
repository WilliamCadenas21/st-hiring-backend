import mongoose, { Schema } from 'mongoose';

const mobileConfig = new Schema({
  customerInfo: { active: Boolean, basicInfo: Boolean, addressInfo: Number },
});

const mobileConfigModel = mongoose.model('mobile-config', mobileConfig);

export default mobileConfigModel;
