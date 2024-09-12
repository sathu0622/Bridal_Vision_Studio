import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UpdateProductPopup from './UpdateProductPopup ';

const AdminView = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:5000/api/products/getImages')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/products/delete/${id}`)
            .then(() => {
                fetchProducts(); // Refresh the product list
            })
            .catch(err => console.log(err));
    };

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setIsPopupOpen(true); // Open the popup
    };

    return (
        <div>
            <Header />
            <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-green-800">Admin View</h2>
                    <a 
                        href="/add-product" 
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Add Product
                    </a>
                </div>
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Size</th>
                            <th className="py-2 px-4 border-b">Quantity</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="border-b hover:bg-gray-50">
                                <td className="p-4">
                                    <img 
                                        src={`http://localhost:5000/Images/${product.image}`} 
                                        alt={product.name} 
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                </td>
                                <td className="p-4" style={{ color: '#D4AF37' }}>{product.name}</td>
                                <td className="p-4 text-gray-700">
                                    {product.discount ? (
                                        <>
                                            <span className="line-through text-gray-500">${product.price}</span>
                                            <span className="ml-2 font-bold" style={{ color: '#D4AF37' }}>
                                                ${((1 - product.discount / 100) * product.price).toFixed(2)}
                                            </span>
                                        </>
                                    ) : (
                                        <span style={{ color: '#D4AF37' }}>${product.price}</span>
                                    )}
                                </td>
                                <td className="p-4 text-gray-600">{product.size}</td>
                                <td className="p-4 text-gray-600">{product.quantity}</td>
                                <td className="p-4 flex space-x-4">
                                    <button 
                                        onClick={() => handleUpdate(product)}
                                        className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-700 mr-2"
                                    >
                                        Update
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />

            {/* Update Product Popup */}
            {isPopupOpen && (
                <UpdateProductPopup 
                    product={selectedProduct} 
                    onClose={() => setIsPopupOpen(false)} 
                    onUpdate={fetchProducts}
                />
            )}
        </div>
    );
};

export default AdminView;
