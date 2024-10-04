import React, { useState } from "react";
import Bgg2 from "../assests/bgg2.jpg";

const Note = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Want to find out what is new in the town",
      content:
        "Browse and find out the most trending dresses and accessories of all time.",
    },
    {
      title: "What we have more than others?",
      content: "Fit on and fit check with us to find our best collection.",
    },
  ];

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="m-4 flex flex-row-reverse relative items-center">
      {/* Text and Notes Section */}
      <div className="w-1/2 p-10 border-slate-300">
        <h2 className="text-4xl font-bold text-gold-600">BVS </h2>
        <p className="mt-4 text-lg text-gray-500">
          Start with us to try the <b>fitton</b>, personal bridal recommendations, sparkling jewels & more!
        </p>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold">{slides[currentSlide].title}</h3>
          <p className="mt-2 text-gray-700">{slides[currentSlide].content}</p>

          {/* Slide controls */}
          <div className="flex justify-between items-center mt-6">
            <button className="text-gray-500 hover:text-gray-700" onClick={handlePrevSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700" onClick={handleNextSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>

          {/* Get Started Button */}
          <button className="mt-6 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800">
            <a href="/view-product">Get Started</a>
          </button>
        </div>
      </div>

      {/* Right Side Image */}
      <div
        className="w-1/2 h-96 bg-no-repeat bg-cover bg-center rounded-lg shadow-md" // Changed height here
        style={{ backgroundImage: `url(${Bgg2})` }}
      ></div>
    </div>
  );
};

export default Note;
