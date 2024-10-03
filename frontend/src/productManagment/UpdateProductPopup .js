import React, { useState } from 'react';
import axios from 'axios';

const UpdateProductPopup = ({ product, onClose, onUpdate }) => {
    const [name, setName] = useState(product.name || ''); // Default to an empty string
    const [quantity, setQuantity] = useState(product.quantity || 0);
    const [price, setPrice] = useState(product.price || 0);
    const [description, setDescription] = useState(product.description || '');
    const [size, setSize] = useState(product.size || 'XS');
    const [colour, setColour] = useState(product.colour || 'Red');
    const [discount, setDiscount] = useState(product.discount || 0);
    const [gender, setGender] = useState(product.gender || 'Male');
    const [category, setCategory] = useState(product.category || 'Saree');
    const [error, setError] = useState('');

    const handleSave = () => {
        // Basic Validation
        if (!name || name.trim() === '') {
            setError('Product name is required');
            return;
        }

        if (isNaN(price) || price <= 0) {
            setError('Price must be a valid number greater than 0');
            return;
        }

        if (isNaN(quantity) || quantity < 0) {
            setError('Quantity must be a non-negative number');
            return;
        }

        if (!description || description.trim() === '') {
            setError('Description is required');
            return;
        }

        if (isNaN(discount) || discount < 0 || discount > 100) {
            setError('Discount must be between 0 and 100');
            return;
        }


        setError(''); // Clear any existing error before proceeding

        axios.put(`http://localhost:5000/api/products/update/${product._id}`, {
            name,
            quantity,
            price,
            description,
            size,
            colour,
            discount,
            gender,
            category,
        })
        .then(() => {
            onUpdate(); // Refresh the product list
            onClose(); // Close the popup
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-xl font-semibold mb-4">Update Product</h3>

                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error message display */}

                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Product Name"
                />

                <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Price"
                />

                <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Quantity"
                />

                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Description"
                />

                {/* Size Select */}
                <select
                    value={size}
                    onChange={e => setSize(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>

                {/* Colour Select */}
                <select
                    value={colour}
                    onChange={e => setColour(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                >
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                </select>

                <input
                    type="number"
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="Discount (%)"
                />

                {/* Gender Select */}
                <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                {/* Category Select */}
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                >
                    <option value="Saree">Saree</option>
                    <option value="Coat">Coat</option>
                    <option value="Jewellery">Jewellery</option>
                    <option value="Earrings">Earrings</option>
                </select>


                <div className="flex justify-between">
                    <button 
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Save
                    </button>
                    <button 
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPopup;
