import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    sellerId: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    photos: [{type: String, required: true}],
    category: {type: String, required: true},
    stock: {type: Number, required: true},
    favorite: {type: Boolean, default: false}
})

const Product = mongoose.model('Product', productSchema);
export default Product;