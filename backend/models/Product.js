const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    size: {type:String, require:true},
    colour:{type:String, require:true},
    image: String
});

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
