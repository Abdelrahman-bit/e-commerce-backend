function getAllUsers(req, res){
    res.send('All users')
}

function addNewUser(req, res){
    res.send('Add new user');
}

function updateUser(req, res){
    res.send('Update user');
}

function deleteUser(req, res){
    res.send('delete user');
}


export { getAllUsers, addNewUser, updateUser, deleteUser }