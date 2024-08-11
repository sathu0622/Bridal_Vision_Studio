import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';

const AddProduct = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [size, setSize] = useState('');
    const [colour, setColour] = useState('');
    const [images, setImages] = useState([]);

    const handleUpload = (e) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('size', size);
        formData.append('colour', colour);

        axios.post('http://localhost:5000/api/products/upload', formData)
            .then(res => {
                console.log('Upload response:', res.data);
                setImages(prevImages => [...prevImages, res.data]);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/products/getImages')
            .then(res => {
                console.log('Get images response:', res.data);
                setImages(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg border border-blue-300">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Add New Product</h2>
            <div className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Product Name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="number" 
                    placeholder="Quantity" 
                    value={quantity} 
                    onChange={e => setQuantity(e.target.value)} 
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={price} 
                    onChange={e => setPrice(e.target.value)} 
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="text" 
                    placeholder="Size" 
                    value={size} 
                    onChange={e => setSize(e.target.value)} 
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="text" 
                    placeholder="Colour" 
                    value={colour} 
                    onChange={e => setColour(e.target.value)} 
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="file" 
                    onChange={e => setFile(e.target.files[0])} 
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    onClick={handleUpload} 
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Upload
                </button>
            </div>
            <br />
        </div>
    );
};

export default AddProduct;
