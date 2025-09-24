import express from 'express';
import {getAllProducts, addNewProduct, updateProduct, deleteProduct} from '../controls/productControls.js'
import asyncHandler from '../utils/catchAsync.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.get("/", asyncHandler(getAllProducts));
router.post('/', upload.array('photos', 5), asyncHandler(addNewProduct));
router.patch('/:id', upload.array('photos', 5), asyncHandler(updateProduct));
router.delete('/:id', asyncHandler(deleteProduct));



export default router