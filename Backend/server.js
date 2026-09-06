require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();

app.use((req, res, next) => {
  if (!connectDB.isConnected) {
    return res.status(503).json({
      message: 'Service Unavailable'
    });
  }
  next();
});
