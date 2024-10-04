import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import Header from "../components/Header";
import Footer from "../components/Footer";

import dress1 from './dress1.jpg';
import dress2 from './dress2.jpg';
import dress3 from './dress3.jpg';
import voice from './voice1.mp3';
import voiceNotRecognized from './voice2.mp3';

const SkinToneDetector = () => {
  const targetRef = useRef(null);

  const [videoFrameVisible, setVideoFrameVisible] = useState(false);
  const [skinTone, setSkinTone] = useState('');
  const [gender, setGender] = useState('');
  const audioRef = useRef(null);
  const audioNotRecognizedRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState(''); // Add search term state

  useEffect(() => {
    if (videoFrameVisible && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [videoFrameVisible]);

  const handleScroll = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStartVideo = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/start-video');
      
      if (response.data.error === "Face not detected") {
        toast.error("Face not detected. Please ensure your face is visible."); // Use toast for error
        // Play the error voice
        if (audioNotRecognizedRef.current) {
          audioNotRecognizedRef.current.play();
        }
        return;
      }
  
      const { skin_tone, gender } = response.data;
      
      if (!skin_tone || !gender || skin_tone === 'Unknown') {
        toast.error("Invalid skin tone or gender detected."); // Use toast for error
        // Play fallback audio
        if (audioNotRecognizedRef.current) {
          audioNotRecognizedRef.current.play();
        }
        return;
      }
  
      toast.success(`Successfully detected`);
      let detectedGender = gender;
  
      setSkinTone(skin_tone);
      setGender(detectedGender);
      setVideoFrameVisible(true);
  
      fetchProductsByGender(detectedGender);
    } catch (error) {
      console.error('Error starting video feed:', error);
      toast.error("An error occurred while processing the video feed."); // Use toast for error
      if (audioNotRecognizedRef.current) {
        audioNotRecognizedRef.current.play();
      }
    }
  };  

  const [products, setProducts] = useState({ dresses: [], jewelry: [] });

  const fetchProductsByGender = async (detectedGender) => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/getImages');
      const allProducts = res.data;
  
      const filteredDresses = allProducts.filter(
        (product) => product.gender === detectedGender && (product.category === 'Saree' || product.category === 'Coat')
      );      
      
      const filteredJewelry = allProducts.filter(
        (product) => product.gender === detectedGender && (product.category === 'Jewellery' || product.category === 'Earring')
      );
  
      setProducts({ dresses: filteredDresses, jewelry: filteredJewelry });
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error("Error fetching products. Please try again later.");
    }
  };
  
  const handleButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }

    handleStartVideo();

    setTimeout(() => {
      handleScroll();
    }, 19000);
  };

  // Filter products based on search term
  const filteredDresses = products.dresses.filter(dress => 
    dress.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJewelry = products.jewelry.filter(jewel =>
    jewel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-purple-50 to-white flex items-center justify-center p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Welcome To Bridal Vision Studio Dress Suggestion Chat Bot
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              Welcome to Bridal Vision Studio! Our Dress Suggestion Chat Bot helps you find the perfect bridal gown tailored to your skin tone and gender. Share your details, and receive personalized dress recommendations that enhance your natural beauty. Discover stunning gowns that complement your style for your special day!
            </p>
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <button 
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition"
                onClick={handleButtonClick}
              >
                Get started
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center items-center space-x-4">
            <div className="flex flex-col space-y-4">
              <img
                src={dress1}
                alt="AI model 1"
                className="rounded-lg shadow-lg w-40 h-60"
              />
              <img
                src={dress2}
                alt="AI model 2"
                className="rounded-lg shadow-lg w-40 h-60"
              />
            </div>
            <div>
              <img
                src={dress3}
                alt="AI model 3"
                className="rounded-lg shadow-lg w-40 h-60"
              />
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={voice} preload="auto" />
      <audio ref={audioNotRecognizedRef} src={voiceNotRecognized} preload="auto" />

      <div ref={targetRef} className="min-h-screen bg-white flex flex-col items-center justify-center py-20 w-full max-w-7xl mx-auto">
  {videoFrameVisible && (
    <div className="mt-6 w-full">
      <div className="w-full flex justify-between items-center">
        <div>
          <p className="text-xl">Skin Tone: {skinTone}</p>
          <p className="text-xl">Gender: {gender}</p>
        </div>
        <input 
          type="text" 
          placeholder="Search dresses or jewelry..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
        />
      </div>

      <h2 className="text-2xl font-semibold mt-6">Recommended Dresses</h2>
      <div className="flex flex-wrap gap-6 mt-4 w-full justify-center">
        {filteredDresses.length > 0 ? (
          filteredDresses.map((dress, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={`http://localhost:5000/Images/${dress.image}`}
                alt={dress.name}
                className="w-36 h-48 object-cover rounded-md shadow-md"
              />
              <p className="mt-2 text-center text-lg">{dress.name}</p>
            </div>
          ))
        ) : (
          <p className="text-lg">No dresses available for this gender.</p>
        )}
      </div>

      <h2 className="text-2xl font-semibold mt-8">Recommended Jewelry</h2>
      <div className="flex flex-wrap gap-6 mt-4 w-full justify-center">
        {filteredJewelry.length > 0 ? (
          filteredJewelry.map((jewelry, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={`http://localhost:5000/Images/${jewelry.image}`}
                alt={jewelry.name}
                className="w-36 h-48 object-cover rounded-md shadow-md"
              />
              <p className="mt-2 text-center text-lg">{jewelry.name}</p>
            </div>
          ))
        ) : (
          <p className="text-lg">No jewelry available for this gender.</p>
        )}
      </div>
    </div>
  )}
</div>
      
      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick={true} draggable pauseOnHover />
      <Footer />
    </div>
  );
};

export default SkinToneDetector;
