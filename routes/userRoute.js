import express from 'express';
import { getAllUsers, addNewUser, updateUser, deleteUser } from "../controls/userControls.js";

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', addNewUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;