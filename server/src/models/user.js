import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    phoneNumber: String,
    stateAbbrv: String,
});

let UserModel = mongoose.model('User', userSchema);

export default UserModel;