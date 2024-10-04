import React from 'react';
import Face from '../assests/face.jpg';

const FaceDetectionComponent = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex-1 md:mr-8 mb-4 md:mb-0 text-center md:text-left"> {/* Text section */}
        <h2 className="text-4xl font-bold mb-4 text-gray-800"> {/* Increased font size and weight */}
          Face Detection for Jewelry and Dress Suggestions
        </h2>
        <p className="mb-4 text-lg text-gray-700"> {/* Increased font size and changed color */}
          Our innovative face detection feature allows customers to upload their photo and get personalized recommendations for jewelry and dresses that best suit their unique features. Discover styles that enhance your beauty with just a click!
        </p>
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"> {/* Increased padding for button */}
          <a href='/skinToneDetector'>Get Suggestions</a>
        </button>
      </div>
      <div className="flex justify-center md:ml-8"> {/* Added a flex container for the image */}
        <img 
          src={Face} // Replace with your actual image URL
          alt="Face Detection Example"
          className="w-full max-w-2xl h-auto rounded-lg shadow-lg" // Increased max-width and set height to auto
        />
      </div>
    </div>
  );
};

export default FaceDetectionComponent;
