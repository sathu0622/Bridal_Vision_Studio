import React from "react";
import FB from "../assests/facebook.png";
import IG from "../assests/instagram.png";
import WA from "../assests/logo.png";
import GG from "../assests/google.png";

function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
        
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-pink-600">
            GROOMS <span className="text-white">of SRI LANKA</span>
          </h1>
          <p className="mt-4 text-gray-400">
            Welcome to Bridal Vision Studio! The Biggest Most Comprehensive Bridal and Wedding Website in Sri Lanka...
          </p>
        </div>

        {/* Center Section */}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-xl mb-4">Our Location</h2>
          <p className="text-gray-400">
            <span role="img" aria-label="Sri Lanka Flag">🇱🇰</span> 36/3, Janith Dammika Mw., Koththalawala , Kadwuwela , Sri Lanka
          </p>
         
        </div>

        {/* Right Section */}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-xl mb-4">Emails</h2>
          <p className="text-gray-400">info@bridalvisionstudio.com</p>
          <h2 className="font-bold text-xl mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-400">Sri Lanka: +94 77 324 7116</p>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="flex flex-col items-center mt-10 space-y-3">
        <div className="flex space-x-6 bg-white p-4 border-r-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img
              src={FB}
              alt="Facebook"
              className="w-8 h-8 filter grayscale hover:grayscale-0 hover:w-10 hover:h-10 transition-all duration-300"
            />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img
              src={IG}
              alt="Instagram"
              className="w-8 h-8 filter grayscale hover:grayscale-0 hover:w-10 hover:h-10 transition-all duration-300"
            />
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <img
              src={WA}
              alt="WhatsApp"
              className="w-8 h-8 filter grayscale hover:grayscale-0 hover:w-10 hover:h-10 transition-all duration-300"
            />
          </a>
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <img
              src={GG}
              alt="Google"
              className="w-8 h-8 filter grayscale hover:grayscale-0 hover:w-10 hover:h-10 transition-all duration-300"
            />
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-center mt-5 text-gray-500">© 2024, Powered by SPASH</p>
      </div>
    </footer>
  );
}

export default Footer;
