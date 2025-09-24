import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import User from "../models/userSchema.js";
import createError from "../utils/createError.js";

async function getAllUsers(req, res){
    const allUsers = await User.find({});
    if(!allUsers) throw createError(); // the default return of the createError is Internal server error, 500
    res.status(200).json(allUsers)
}

async function addNewUser(req, res){
    const {name, email, password} = req.body;
    if(!name || !email || !password) throw createError('name, email and password are required', 400);
    const existingUser = await User.findOne({email});
    if(existingUser) throw createError('this email is already exist', 409);
    const salt = 10;
    const hashedPassword = bcrypt.hash(password, salt);

    const newUser = await User.create({name, email, password: hashedPassword});
    if(!newUser) throw createError();
    res.status(201).json({message: 'user created successfully'})
}

async function loginUser(req, res){
    const { email, password } = req.body;
	if (!email || !password) throw createError("email and password are required", 400);

	const user = await User.findOne({ email });
	if (!user) throw createError("User not found", 404);

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw createError("Invalid credentials", 401);

	const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET, { expiresIn: "1d" });
	res.status(200).json({ message: "Login successful", token });
}

async function updateUser(req, res){
    const userId = req.params;
    const {name, email, password} = req.body
    if(!userId) throw createError('user id is required!', 400);
    if(!name, !email, !password) throw createError('no data is provided, at lest provide one feild', 400);
    
    let userData = {}
    if(name) userData.name = name;
    if(email) userData.email = email;
    if(password) userData.password = password;
    if(Object.keys(userData).length === 0) throw createError('No fields to update!', 400);

    const updatedUser = await User.findByIdAndUpdate(userId, {$set: userData})
    if(!updatedUser) throw createError(`user with id ${userId} is not found`, 404);

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

 /**
  * @see TODO
  * */
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


export { getAllUsers, addNewUser, loginUser, updateUser, deleteUser, forgetPassword }