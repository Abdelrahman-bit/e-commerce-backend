import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    orderDate: {type: Date, default: Date.now},
    total: {type: Number, required: true},
    products: [ 
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, default: 1}
        }
    ]
})

const Order = mongoose.model('Order', orderSchema);
export default Order;