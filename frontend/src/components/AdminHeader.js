import React from 'react';
import { Link } from 'react-router-dom';
import BVS from "../assests/logo1.png";

const AdminHeader = () => {
    return (
        <header className="bg-purple-500 text-white py-4 px-6"> {/* Added padding on left and right */}
            <div className="container mx-auto flex justify-between items-center">
                {/* Left side: Logo and title */}
                <div className="flex items-center space-x-4">
                    <img src={BVS} alt="BVS Logo" className="w-30 h-20" />
                    <h3 className="font-bold text-lg">
                        <Link to="/" className="hover:text-gray-200">BRIDAL VISION STUDIO</Link>
                    </h3>
                </div>
                {/* Right side: Navigation */}
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/add-product" className="hover:text-gray-200">Add Product</Link>
                        </li>
                        <li>
                            <Link to="/admin-product" className="hover:text-gray-200">Product Details</Link>
                        </li>
                        <li>
                            <Link to="/payment-details" className="hover:text-gray-200">Payment Details</Link>
                        </li>
                        <li>
                            <Link to="/feedback" className="hover:text-gray-200">Feedback</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;
