import express from "express";
import { addToCart, getCart, removeFromCart, clearCart } from "../controls/cartControls.js";
import asyncHandler from "../utils/catchAsync.js";

const router = express.Router();

router.post("/", asyncHandler(addToCart));
router.get("/", asyncHandler(getCart));
router.delete("/:productId", asyncHandler(removeFromCart));
router.delete("/", asyncHandler(clearCart));

export default router;
