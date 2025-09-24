import Product from "../models/productsSchema.js";
import createError from "../utils/createError.js";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
async function getAllProducts(req, res) {
	const { category, sellerId, favorite, page = 1, limit = 10 } = req.query;

	const filter = {};
	if (category) filter.category = category;
	if (sellerId) filter.sellerId = sellerId;
	if (favorite) filter.favorite = favorite === "true";

	const products = await Product.find(filter)
        .populate("sellerId", "name email")
		.skip((page - 1) * limit)
		.limit(Number(limit))

	if (!products.length) throw createError("No products found", 404);

	const total = await Product.countDocuments(filter);

	res.status(200).json({
		products,
		total,
		page: Number(page),
		pages: Math.ceil(total / limit),
	});
}

/**  
* @desc    Add new product
* @route   POST /api/products
* @access  Private (Seller)
*/ 
async function addNewProduct(req, res) {
	const { name, description, price, category, stock } = req.body;

  if (!name || !description || !price || !category || !stock) {
    throw createError("All fields are required", 400);
  }

  const photos = req.files ? req.files.map((file) => file.path) : [];

  const product = await Product.create({
    sellerId: req.userId,
    name,
    description,
    price,
    category,
    stock,
    photos,
  });

  res.status(201).json(product);
}

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Seller/Admin)
async function updateProduct(req, res) {
	const { id } = req.params;
	const updates = req.body;

	const product = await Product.findById(id);
	if (!product) throw createError("Product not found", 404);

	// Only product owner and admin can update
	if (product.sellerId.toString() !== req.userId && req.role !== "admin") {
		throw createError("Not authorized to update this product", 403);
	}

	// Handle uploaded files (if any)
	if (req.files && req.files.length > 0) {
		// Add new uploaded photos to existing ones
		const newPhotos = req.files.map((file) => file.path);
		updates.photos = [...product.photos, ...newPhotos];
	}

	// Merge updates into product
	Object.assign(product, updates);
	await product.save();

	res.status(200).json({
		message: "Product updated successfully",
		product,
	});
}

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Seller/Admin)
async function deleteProduct(req, res) {
	const { id } = req.params;

	const product = await Product.findById(id);
	if (!product) throw createError("Product not found", 404);

	// Only product owner or admin can delete
	if (product.sellerId.toString() !== req.userId && req.role !== 'admin') {
		throw createError("Not authorized to delete this product", 403);
	}

	await product.deleteOne();
	res.status(200).json({ message: "Product deleted successfully" });
}

export { getAllProducts, addNewProduct, updateProduct, deleteProduct };
