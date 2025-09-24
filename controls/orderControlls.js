import mongoose from "mongoose";
import Order from "../models/orderSchema.js";
import Product from "../models/productsSchema.js";
import createError from "../utils/createError.js";

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
async function createOrder(req, res) {
	const { products, total } = req.body;

	if (!products || !products.length) {
		throw createError("Order must have at least one product", 400);
	}
	if (!total) {
		throw createError("Order must have a total amount", 400);
	}

	// Validate products
	for (let item of products) {
		if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
			throw createError("Invalid product ID", 400);
		}
		const productExists = await Product.findById(item.productId);
		if (!productExists) {
			throw createError(`Product not found: ${item.productId}`, 404);
		}
	}

	const order = await Order.create({
		userId: req.userId,
		products,
		total,
	});

	res.status(201).json(order);
}

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private (admin)
async function getAllOrders(req, res) {
	if (req.role !== "admin") throw createError("Access denied", 403);

	const orders = await Order.find().populate("userId", "name email").populate("products.productId", "name price");

	res.status(200).json(orders);
}

// @desc    Get orders for logged-in user
// @route   GET /api/orders/my-orders
// @access  Private
async function getUserOrders(req, res) {
	const orders = await Order.find({ userId: req.userId }).populate("products.productId", "name price");

	res.status(200).json(orders);
}

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Private (admin or order owner)
async function deleteOrder(req, res) {
	const { id } = req.params;

	const order = await Order.findById(id);
	if (!order) throw createError("Order not found", 404);

	if (order.userId.toString() !== req.userId && req.role !== "admin") {
		throw createError("Not authorized to delete this order", 403);
	}

	await order.deleteOne();
	res.status(200).json({ message: "Order deleted successfully" });
}

export { createOrder, getAllOrders, getUserOrders, deleteOrder };
