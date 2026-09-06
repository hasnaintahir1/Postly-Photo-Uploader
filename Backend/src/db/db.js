const mongoose = require('mongoose');

// async function connectDB(){
//     await mongoose.connect(process.env.MONGODB_URI);

//     console.log('MongoDB connected');
// };

let isConnected = false;

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectDB;