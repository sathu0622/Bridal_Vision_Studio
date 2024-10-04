import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [selectedColour, setSelectedColour] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [gender, setGender] = useState('Male');
    const [category, setCategory] = useState('Saree');
    const userEmail = sessionStorage.getItem('userEmail');

    // Validation state
    const [errors, setErrors] = useState({});

    const colors = ['Black','White','Red', 'Blue', 'Yellow'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    const navigate = useNavigate()

    const validateForm = () => {
        let errors = {};
    
        // String validation for product name
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!name.trim()) {
            errors.name = "Product name is required";
        } else if (!namePattern.test(name)) {
            errors.name = "Product name can only contain letters and spaces";
        }

        if (!description.trim()) {
            errors.description = "Product description is required";
        } else if (!namePattern.test(description)) {
            errors.description = "Product description can only contain letters and spaces";
        }
    
        // Number validation for quantity
        if (!quantity || isNaN(quantity) || quantity <= 0) {
            errors.quantity = "Quantity must be a positive number";
        }
    
        // Number validation for price
        if (!price || isNaN(price) || price <= 0) {
            errors.price = "Price must be a positive number";
        }
    
        // Number validation for discount
        if (discount && (isNaN(discount) || discount < 0 || discount > 100)) {
            errors.discount = "Discount must be a number between 0 and 100";
        }
    
        // Ensure color and size are selected
        if (!selectedColour) {
            errors.colour = "Please select a color";
        }
        if (!selectedSize) {
            errors.size = "Please select a size";
        }
    
        // Ensure image file is uploaded
        if (!file) {
            errors.file = "Please upload an image";
        }
    
        setErrors(errors);
        return Object.keys(errors).length === 0; // Returns true if no errors
    };

    const handleUpload = () => {
        if (!validateForm()) return; // If the form is invalid, stop submission

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('discount', discount);  // Include discount
        formData.append('size', selectedSize);
        formData.append('colour', selectedColour);
        formData.append('gender', gender);
        formData.append('category', category);

        axios.post('http://localhost:5000/api/products/upload', formData)
            .then(res => {
                console.log('Upload response:', res.data);
                navigate('/admin-product')
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Display the selected image immediately
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    return (
        <div>
            <Header />
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">Add New Product</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">General Information</h3>
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="Product Name" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <p className="text-red-600">{errors.name}</p>}

                            <textarea
                                placeholder="Description Product"
                                value={description}  // Bind the value to the state
                                onChange={e => setDescription(e.target.value)}  // Update state when the user types
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            {errors.description && <p className="text-red-600">{errors.description}</p>}


                            <div className="flex space-x-4">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 border border-gray-300 rounded-lg ${selectedSize === size ? 'bg-purple-200' : 'bg-gray-100'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {errors.size && <p className="text-red-600">{errors.size}</p>}

                            <div className="flex space-x-4">
                                {colors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColour(color)}
                                        className={`px-4 py-2 border border-gray-300 rounded-lg ${selectedColour === color ? 'bg-purple-200' : 'bg-gray-100'}`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                            {errors.colour && <p className="text-red-600">{errors.colour}</p>}

                            <select
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Saree">Saree</option>
                                <option value="Jewellery">Jewellery</option>
                                <option value="Coat">Coat</option>
                                <option value="Earring">Earring</option>
                            </select>
                        </div>
                    </div>

                    {/* Image Upload and Discount */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Upload Img</h3>
                        <label
                            htmlFor="file-upload"
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition"
                        >
                            Choose File
                        </label>
                        <input 
                            id="file-upload"
                            type="file" 
                            onChange={handleFileChange} 
                            className="hidden"
                        />
                        <div className="mt-4">
                            <div className="w-full h-64 bg-white-200 border border-gray-300 rounded-lg flex items-center justify-center">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Uploaded Preview"
                                        className="max-h-full max-w-full object-contain rounded-lg"
                                    />
                                ) : (
                                    <span className="text-gray-500"> Add Image</span>
                                )}
                            </div>
                            {errors.file && <p className="text-red-600">{errors.file}</p>}
                        </div>

                        {/* Discount Percentage */}
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Discount Percentage</h3>
                            <input
                                type="text"
                                placeholder="Enter discount percentage"
                                value={discount}
                                onChange={e => setDiscount(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.discount && <p className="text-red-600">{errors.discount}</p>}
                        </div>
                    </div>

                    {/* Pricing and Stock */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Pricing And Stock</h3>
                        <div className="space-y-2">
                            <input 
                                type="text" 
                                placeholder="Base Pricing" 
                                value={price} 
                                onChange={e => setPrice(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.price && <p className="text-red-600">{errors.price}</p>}

                            <input 
                                type="number" 
                                placeholder="Stock" 
                                value={quantity} 
                                onChange={e => setQuantity(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.quantity && <p className="text-red-600">{errors.quantity}</p>}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <button 
                        onClick={handleUpload} 
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition"
                    >
                        Add Product
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddProduct;
