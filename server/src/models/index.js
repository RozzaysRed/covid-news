import mongoose from 'mongoose';
import User from './user';

require('dotenv').config();

const connectDb = () => {
    return mongoose.connect(process.env.MONGODB_CONN_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
};

const models = { User };

export { connectDb }

export default models;