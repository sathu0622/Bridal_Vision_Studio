import React, { useEffect, useState } from 'react';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';  // Import for table generation
import Header from '../components/AdminHeader';
import Footer from '../components/Footer';
import UpdateProductPopup from './UpdateProductPopup ';

const AdminView = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); 
    const productsPerPage = 5;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:5000/api/products/getImages')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        
        if (confirmDelete) {
            axios.delete(`http://localhost:5000/api/products/delete/${id}`)
                .then(() => {
                    fetchProducts(); 
                })
                .catch(err => console.log(err));
        }
    };

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setIsPopupOpen(true);
    };

    const productsByCategory = products.reduce((acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
      }, {});
    
      const generateReport = () => {
        const doc = new jsPDF();
        const margin = 10; // Margin for the document
        doc.setFontSize(16);
        doc.text('Product Report by Category', margin, margin + 10);
    
        // Set a starting Y position for the first table
        let startY = margin + 20;
    
        Object.keys(productsByCategory).forEach((category) => {
            const categoryProducts = productsByCategory[category];
    
            // Add category title
            doc.setFontSize(14);
            doc.text(category, margin, startY);
            startY += 10; // Increment Y position for the title
    
            // Add a space after the category title for better separation
            startY += 5; // Extra space for clarity
    
            // Create product table for this category
            autoTable(doc, {
                head: [['Name', 'Price', 'Quantity', 'Total Value']],
                body: categoryProducts.map(product => [
                    product.name, 
                    `Rs. ${product.price.toFixed(2)}`,  // Change to Rs.
                    product.quantity, 
                    `Rs. ${(product.price * product.quantity).toFixed(2)}` // Change to Rs.
                ]),
                startY: startY,
                theme: 'striped',
                headStyles: { fillColor: [41, 128, 185] },
                margin: { top: margin, right: margin, bottom: margin, left: margin },
                columnStyles: {
                    0: { cellWidth: 60 }, // Name
                    1: { cellWidth: 30 }, // Price
                    2: { cellWidth: 30 }, // Quantity
                    3: { cellWidth: 40 }  // Total Value
                },
            });
    
            // Update startY for total value after the table
            startY = doc.lastAutoTable.finalY + 10; // Set startY to the end of the table
    
            // Add some space before the total value
            startY += 5; // Extra space before the total value
            
            const totalValue = categoryProducts.reduce((total, product) => total + product.price * product.quantity, 0);
            doc.setFontSize(12);
            doc.text(`Total Value for ${category}: Rs. ${totalValue.toFixed(2)}`, margin, startY); // Change to Rs.
    
            // Update startY for the next category, adding extra space after the total value
            startY += 15; // Add space for the next category title
    
            // Check if a new page is needed
            if (startY > 250) {
                doc.addPage();
                startY = margin; // Reset startY for the new page
            }
        });
    
        // Save the PDF
        doc.save('ProductReport.pdf');
    };
    
    

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Header />
            <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-purple-800">Product Details</h2>
                    <div className="flex space-x-4">
                        <a 
                            href="/add-product" 
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                        >
                            Add Product
                        </a>
                        <button 
                            onClick={generateReport} 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Generate Report
                        </button>
                    </div>
                </div>
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Size</th>
                            <th className="py-2 px-4 border-b">Quantity</th>
                            <th className="py-2 px-4 border-b">Colour</th>
                            <th className="py-2 px-4 border-b">Discount</th>
                            <th className="py-2 px-4 border-b">Gender</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map(product => (
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
                                            <span className="line-through text-gray-500">Rs.{product.price}</span>
                                            <span className="ml-2 font-bold" style={{ color: '#D4AF37' }}>
                                                Rs.{((1 - product.discount / 100) * product.price).toFixed(2)}
                                            </span>
                                        </>
                                    ) : (
                                        <span style={{ color: '#D4AF37' }}>Rs.{product.price}</span>
                                    )}
                                </td>
                                <td className="p-4 text-gray-600">{product.size}</td>
                                <td className="p-4 text-gray-600">{product.quantity}</td>
                                <td className="p-4 text-gray-600">{product.colour}</td>
                                <td className="p-4 text-gray-600">{product.discount ? `${product.discount}%` : 'No Discount'}</td>
                                <td className="p-4 text-gray-600">{product.gender}</td>
                                <td className="p-4 text-gray-600">{product.category}</td>
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

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 mx-1 rounded-lg ${
                                currentPage === index + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'
                            } hover:bg-purple-700`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
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




 