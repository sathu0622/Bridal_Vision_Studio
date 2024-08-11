const ProductModel = require('../models/Product');

// Controller to handle file upload and save product data to MongoDB
const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const { name, quantity, price, size, colour } = req.body;

    ProductModel.create({
        name,
        quantity,
        price,
        size,
        colour,
        image: req.file.filename
    })
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err));
};

// Controller to get all images and product data from MongoDB
const getAllImages = (req, res) => {
    ProductModel.find()
        .then(products => res.json(products))
        .catch(err => res.status(500).send(err));
};

module.exports = { uploadImage, getAllImages };
