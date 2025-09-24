import express from 'express';
import { getAllUsers, addNewUser, updateUser, deleteUser, loginUser, generateLink, resetPassword, renderForm } from "../controls/userControls.js";
import asyncHandler from '../utils/catchAsync.js';

const router = express.Router();

router.get('/', asyncHandler(getAllUsers));
router.get('/render-form', asyncHandler(renderForm)) 
router.post('/generate-reset-link', asyncHandler(generateLink)) // this endpoint should send a reset link to the user's email
router.post("/reset-password", asyncHandler(resetPassword)); // this the acuale endpoint that should return an EJS template to rest the password and reseve it and update the user's password
router.post('/', asyncHandler(addNewUser));
router.post('/login', asyncHandler(loginUser));
router.patch("/", asyncHandler(updateUser));
router.delete('/', asyncHandler(deleteUser));


export default router;