import express from 'express';
import { getAllUsers, addNewUser, updateUser, deleteUser, loginUser } from "../controls/userControls.js";
import asyncHandler from '../utils/catchAsync.js';

const router = express.Router();

router.get('/', asyncHandler(getAllUsers));
router.post('/', asyncHandler(addNewUser));
router.post('/login', asyncHandler(loginUser));
router.put("/:id", asyncHandler(updateUser));
router.delete('/:id', asyncHandler(deleteUser));


export default router;