const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    colour: { type: String, required: true },
    image: { type: String },
    discount: { type: Number },  
    gender: { type: String }, 
    category: { type: String}  
});

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;
