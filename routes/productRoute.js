import express from 'express';
import {getAllProducts, addNewProduct, updateProduct, deleteProduct} from '../controls/productControls.js'
import asyncHandler from '../utils/catchAsync.js';

const router = express.Router();

router.get("/", asyncHandler(getAllProducts));
router.post('/', asyncHandler(addNewProduct));
router.put('/:id', asyncHandler(updateProduct));
router.delete('/:id', asyncHandler(deleteProduct));


export default router