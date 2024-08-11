const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadImage, getAllImages } = require('../controllers/product_Controllers');

const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
router.post('/upload', upload.single('file'), uploadImage);
router.get('/getImages', getAllImages);

module.exports = router;