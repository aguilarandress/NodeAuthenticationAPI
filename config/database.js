import mongoose from 'mongoose';

/**
 * Connec to MongoDB database
 */
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Connected to MongoDB...'.blue.bold);
  } catch (err) {
    console.error(err);
  }
};

export default connectToDatabase;
