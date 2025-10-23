import mongoose from 'mongoose';

async function mongoInit() {
    try {
        await mongoose.connect('mongodb://root:example@localhost:27017/test?authSource=admin&directConnection=true');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export default mongoInit;
