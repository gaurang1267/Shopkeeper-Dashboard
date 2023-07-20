const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderID: {
        type: String,
        required: [true, 'Order ID is required']
    },
    customer: {
        type: String,
        required: [true, 'Customer name is required']
    },
    orderDate: {
        type: Date,
        required: [true, 'Order Date is required']
    },
    itemName: {
        type: String,
        required: [true, 'Item Name is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    unitPrice: {
        type: Number,
        required: [true, 'Unit Price is required']
    },
});


module.exports = mongoose.model('Orders', orderSchema);