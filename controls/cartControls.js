import mongoose from "mongoose";
import Cart from "../models/cartSchema.js";
import Product from "../models/productsSchema.js";
import createError from "../utils/createError.js";

// @desc    Add product to cart
// @route   POST /api/cart
// @access  Private
async function addToCart(req, res) {
	const { productId, quantity } = req.body;

	if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
		throw createError("Invalid product ID", 400);
	}

	const product = await Product.findById(productId);
	if (!product) {
		throw createError("Product not found", 404);
	}

	let cart = await Cart.findOne({ userId: req.userId });

	if (!cart) {
		cart = await Cart.create({
			userId: req.userId,
			products: [{ productId, quantity: quantity || 1 }],
		});
	} else {
		const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);

		if (productIndex > -1) {
			cart.products[productIndex].quantity += quantity || 1;
		} else {
			cart.products.push({ productId, quantity: quantity || 1 });
		}

		await cart.save();
	}

	res.status(201).json(cart);
}

// @desc    Get logged-in user's cart
// @route   GET /api/cart
// @access  Private
async function getCart(req, res) {
	const cart = await Cart.findOne({ userId: req.userId }).populate("products.productId", "name price photos category");

	if (!cart) throw createError("Cart is empty", 404);

	res.status(200).json(cart);
}

// @desc    Remove a product from cart
// @route   DELETE /api/cart/:productId
// @access  Private
async function removeFromCart(req, res) {
	const { productId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(productId)) {
		throw createError("Invalid product ID", 400);
	}

	const cart = await Cart.findOne({ userId: req.userId });
	if (!cart) throw createError("Cart not found", 404);

	cart.products = cart.products.filter((p) => p.productId.toString() !== productId);

	await cart.save();

	res.status(200).json(cart);
}

// @desc    Clear the cart
// @route   DELETE /api/cart
// @access  Private
async function clearCart(req, res) {
	const cart = await Cart.findOne({ userId: req.userId });
	if (!cart) throw createError("Cart not found", 404);

	cart.products = [];
	await cart.save();

	res.status(200).json({ message: "Cart cleared successfully" });
}

export { addToCart, getCart, removeFromCart, clearCart };
