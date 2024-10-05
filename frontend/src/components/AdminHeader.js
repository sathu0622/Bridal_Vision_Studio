import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BVS from "../assests/logo1.png";
import { useNavigate } from "react-router-dom";




const AdminHeader = () => {


    const navigate = useNavigate()


const handleLogout =()=>{
    axios.get('http://localhost:5000/auth/logout')
    .then(res => {
      if(res.data.status){
        sessionStorage.removeItem('userEmail');
        navigate('/login')
      }
    }).catch(err => {
      console.log(err)
    })
  }
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
                            <Link to="/listreview" className="hover:text-gray-200">Feedback</Link>
                        </li>
                        <li>
                        <div className="Pro-header-component" onClick={handleLogout}>Logout</div>
                        </li>

                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;
