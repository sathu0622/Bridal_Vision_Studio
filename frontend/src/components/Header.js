import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Bars4Icon } from "@heroicons/react/24/solid";
import BVS from "../assests/logo1.png";
import { useNavigate } from "react-router-dom";

function Header({ cart = [] }) { // Default to an empty array if cart is undefined
  const [toggleMenu, setToggleMenu] = useState(false);

  // Check if cart is defined and use reduce safely
  const totalItems = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  
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
    <>
      <header className="flex justify-between px-5 py-6  relative z-20 h-26 comName bg-stone-">
      <div className="flex items-center space-x-4">
          <img src={BVS} alt="BVS Logo" className="w-30 h-20 mt-4 border-r-inherit mb-2" />
          <h3 className="font-bold text-lg mt-2">
            <Link to="/">BRIDAL VISION STUDIO</Link>
          </h3>
        </div>
        <nav className="hidden md:block mt-10">
          <ul className="flex">
            <li className="px-2">
              <Link to="/">Home</Link>
            </li>
            <li className="px-2">
              <Link to="/about">About</Link>
            </li>
            <li className="px-2">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="px-2">
              <Link to="/review">Feedback</Link>
            </li>
            <li className="px-2">
              {/* Shopping Cart Link */}
              <Link to="/cart" className="relative">
                <span className="material-icons">shopping_cart</span>
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
            <li>
                        <div className="Pro-header-component" onClick={handleLogout}>Logout</div>
                        </li>
          </ul>
        </nav>

        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className="block md:hidden"
        >
          <Bars4Icon className="text-black h-5" />
        </button>
      </header>

      {toggleMenu && (
        <nav className="absolute left-0 w-full md:hidden z-10 mobile-nav">
          <ul className="flex flex-col">
            <li className="w-full text-center border-b px-3 py-4">
              <Link to="/home">Home</Link>
            </li>
            <li className="w-full text-center border-b px-3 py-4">
              <Link to="/about">About</Link>
            </li>
            <li className="w-full text-center border-b px-3 py-4">
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="w-full text-center border-b px-3 py-4">
              <Link to="/collection">Collections</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Header;
