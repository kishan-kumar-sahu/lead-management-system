const mongoose = require('mongoose');

async function connectDB(uri) {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.warn('MongoDB unavailable:', error.message);
    return false;
  }
}

module.exports = connectDB;
