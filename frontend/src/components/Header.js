import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars4Icon } from "@heroicons/react/24/solid";
import BVS from "../assests/logo1.png";

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);

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
              <Link to="/collection">Collections</Link>
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
