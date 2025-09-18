import express from 'express';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addNewProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


export default router