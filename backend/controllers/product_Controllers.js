const ProductModel = require('../models/Product');

// Controller to handle file upload and save product data to MongoDB
const uploadImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }

        const { name, quantity, price, size, colour, gender, discount, category } = req.body;

        ProductModel.create({
            name,
            quantity,
            price,
            size,
            colour,
            image: req.file.filename,
            gender,
            discount,
            category
        })
        .then(result => res.json(result))
        .catch(err => {
            console.error('Error saving product:', err);
            res.status(500).send('Error saving product.');
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server encountered an error.');
    }
};


// Controller to get all images and product data from MongoDB
const getAllImages = (req, res) => {
    ProductModel.find()
        .then(products => res.json(products))
        .catch(err => res.status(500).send(err));
};

const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    ProductModel.findByIdAndUpdate(id, { name, quantity, price }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err));
};

const deleteProduct = (req, res) => {
    const { id } = req.params;

    ProductModel.findByIdAndDelete(id)
        .then(() => res.json({ message: 'Product deleted successfully' }))
        .catch(err => res.status(500).send(err));
};

module.exports = { uploadImage, getAllImages, updateProduct, deleteProduct };
