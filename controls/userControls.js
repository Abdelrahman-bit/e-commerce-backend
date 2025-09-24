import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import axios from 'axios';
import User from "../models/userSchema.js";
import createError from "../utils/createError.js";
import sendResetEmail from '../utils/nodemailer.js';

const port = process.env.PORT;
const salt = Number(process.env.SALT); 

async function getAllUsers(req, res){
    const allUsers = await User.find({});
    if(!allUsers) throw createError(); // the default return of the createError is Internal server error, 500
    res.status(200).json(allUsers)
}

async function addNewUser(req, res){
    console.log(req.body)
    const {name, email, password, role} = req.body;
    if(!name || !email || !password) throw createError('name, email and password are required', 400);

    const existingUser = await User.findOne({email});
    if(existingUser) throw createError('this email is already exist', 409);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({name, email, password: hashedPassword, role: role? role: 'customer'});
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

	const token = jwt.sign({ userId: user._id, email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
	res.status(200).json({ message: "Login successful", token });
}

async function updateUser(req, res){
    const userId = req.userId;
    const {name, email, password} = req.body
    if(!userId) throw createError('user id is required!', 400);
    if(!name, !email, !password) throw createError('no data is provided, at lest provide one feild', 400);
    
    const hashedPassword = await bcrypt.hash(password, salt)
    let userData = {}
    if(name) userData.name = name;
    if(email) userData.email = email;
    if(password) userData.password = hashedPassword;
    if(Object.keys(userData).length === 0) throw createError('No fields to update!', 400);

    const updatedUser = await User.findByIdAndUpdate(userId, {$set: userData})
    if(!updatedUser) throw createError(`user with id ${userId} is not found`, 404);

    res.status(201).json('user updated sucessfully');
}

async function generateLink(req, res) {
	const {email: userEmail} = req.body
    if(!userEmail) throw createError('Must provide the user email to reset the password!', 400);

    const userExist = await User.findOne({email: userEmail});
    if(!userExist) throw createError('User email is not exist, Please create a new account', 404);

    const userId = userExist._id;
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" }); 
	const link = `http://localhost:${port}/users/render-form?token=${token}`;

    sendResetEmail(userEmail, link) // send email with the reset link to the user's email
	res.send(`Reset link: <a href="${link}">${link}</a>`);
}

function renderForm(req, res){
    const token = req.query.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) throw createError('Link expired or invalid', 403);

    res.render("reset", { token, apiUrl: `http://localhost:${port}/users/reset-password` }); // pass token to template
}

async function resetPassword(req, res){
    const { token, password } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
	if (!decoded) throw createError("Link expired or invalid", 403);
	try {
		const apiCall = await axios.patch(
			`http://localhost:${port}/users`,
			{ password },
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		console.log("updated successfully:", apiCall.data);
		return res.status(200).json({ message: "Password updated successfully" });
	} catch (err) {
		console.error("Password reset failed:", err.message);
		// Option 2: Send direct response
		return res.status(err.response?.status || 500).json({
			message: err.response?.data?.message || "Password reset failed",
		});
	}
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @TODO Delete all the products that related to the deleted user if he is a seller
 */
async function deleteUser(req, res){
    const userId = req.userId;
    if(!userId) throw createError('id is required!', 400);

    const deletedUser = await User.findByIdAndDelete(userId);
    if(!deletedUser) throw createError(`User with id: ${userId} is not found`, 404);

    res.status(202).json({ message: `Deleted successefully`, userDeleted: `${deletedUser.email}` });
}


export { getAllUsers, addNewUser, loginUser, updateUser, deleteUser, generateLink, resetPassword, renderForm };