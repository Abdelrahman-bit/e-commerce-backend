import User from "../models/userSchema.js";

async function getAllUsers(req, res){
    
}

function addNewUser(req, res){
    // const user = req.body;
    User.create({name: 'hamada', email: 'hamada@example.com', password: 'Hamada123'});
    res.status(201).json({message: 'user created successfully'})
}

function updateUser(req, res){
    res.send('Update user');
}

function deleteUser(req, res){
    res.send('delete user');
}


export { getAllUsers, addNewUser, updateUser, deleteUser }