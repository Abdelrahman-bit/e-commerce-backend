import User from "../models/userSchema.js";
import createError from "../utils/createError.js";

async function getAllUsers(req, res){
    const allUsers = await User.find({});
    if(!allUsers) throw createError(); // the default return of the createError is Internal server error, 500
    res.status(200).json(allUsers)
}

function addNewUser(req, res){
    const {name, email, password} = req.body;
    if(!name || !email || !password) throw createError('name, email and password are required', 400)
    User.create({name: 'hamada', email: 'hamada@example.com', password: 'Hamada123'});
    res.status(201).json({message: 'user created successfully'})
}

// TODO
function updateUser(req, res){
    const {name, email, password} = req.body
    if(!name, !email, !password) throw createError('no data is provided, at lest provide one feild', 400)

    let userData = {}
    if(name) userData.name = name;
    if(email) userData.email = email;
    if(password) userData.password = password;

    res.status(201).json('user updated sucessfully');
}

// useing nodemailer and jwt to generate an endpoint that expire after a sertain time thanks to jwt:

    // Generate an expiring token
// app.get("/generate-link", (req, res) => {
//   const token = jwt.sign({ userId: 123 }, SECRET, { expiresIn: "1m" }); // 1 minute
//   res.json({ link: `http://localhost:3000/secure-endpoint?token=${token}` });
// });

// // Protect endpoint
// app.get("/secure-endpoint", (req, res) => {
//   const token = req.query.token;
//   try {
//     jwt.verify(token, SECRET);
//     res.json({ message: "This link is valid 🎉" });
//   } catch (err) {
//     res.status(403).json({ message: "Link expired or invalid ❌" });
//   }
// });

function forgetPassword(req, res){
    res.send('remempering...')
}

async function deleteUser(req, res){
    const { id } = req.params;
    if(!id) throw createError('id is required!', 400);

    const deletedUser = await User.findByIdAndDelete(id);
    if(!deletedUser) throw createError(`User with id: ${id} is not found`, 404);

    res.status(202).json(`Deleted successefully: ${deletedUser}`)
}


export { getAllUsers, addNewUser, updateUser, deleteUser, forgetPassword }