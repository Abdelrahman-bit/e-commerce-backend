import mongoos from 'mongoose';

const userSchema = new mongoos.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['customer', 'seller', 'admin'], default: 'customer'},
})

const User = mongoos.model('User', userSchema);
export default User;
