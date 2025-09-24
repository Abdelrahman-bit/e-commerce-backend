import express from "express";
import { createOrder, getAllOrders, getUserOrders, deleteOrder } from "../controls/orderControlls.js";
import asyncHandler from "../utils/catchAsync.js";

const router = express.Router();

// Create a new order
router.post("/", asyncHandler(createOrder));

// Get all orders (Admin only)
router.get("/", asyncHandler(getAllOrders));

// Get orders for logged-in user
router.get("/my-orders", asyncHandler(getUserOrders));

// Delete an order
router.delete("/:id", asyncHandler(deleteOrder));

export default router;
