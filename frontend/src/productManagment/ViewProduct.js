// src/components/ViewProduct.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Fitton from "../components/Fitton"; // Ensure correct import

const ViewProduct = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedCategory, setSelectedCategory] = useState("All"); // State for selected category
  const [showModal, setShowModal] = useState(false); // Modal state
  const [selectedImage, setSelectedImage] = useState(null); // Image selected for Try-On

  // Gender & Size Filters
  const [genderFilter, setGenderFilter] = useState({
    women: false,
    men: false,
  });
  const [sizeFilter, setSizeFilter] = useState({
    xsmall: false,
    small: false,
    medium: false,
    large: false,
    xlarge: false,
    xxlarge: false,
  });

  // Example categories
  const categories = ["All", "Coat", "Saree", "Jewellery", "Earring"];

  // Fetch products from the API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/getImages")
      .then((res) => {
        setImages(res.data);
        setFilteredImages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle Gender Filter
  const handleGenderFilter = (gender) => {
    setGenderFilter((prev) => ({ ...prev, [gender]: !prev[gender] }));
  };

  // Handle Size Filter
  const handleSizeFilter = (size) => {
    setSizeFilter((prev) => ({ ...prev, [size]: !prev[size] }));
  };

  // Filter images when category, gender, size, or search query changes
  useEffect(() => {
    let filtered = images;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (image) => image.category === selectedCategory
      );
    }

    // Filter by gender
    const genderMatch =
      (genderFilter.women &&
        filtered.some((image) => image.gender === "Female")) ||
      (genderFilter.men && filtered.some((image) => image.gender === "Male")) ||
      (!genderFilter.women && !genderFilter.men); // No gender filter

    if (genderMatch) {
      filtered = filtered.filter(
        (image) =>
          (genderFilter.women && image.gender === "Female") ||
          (genderFilter.men && image.gender === "Male") ||
          (!genderFilter.women && !genderFilter.men)
      );
    }

    // Filter by size
    const sizeMatch =
      (sizeFilter.xsmall && filtered.some((image) => image.size === "XS")) ||
      (sizeFilter.small && filtered.some((image) => image.size === "S")) ||
      (sizeFilter.medium && filtered.some((image) => image.size === "M")) ||
      (sizeFilter.large && filtered.some((image) => image.size === "L")) ||
      (sizeFilter.xlarge && filtered.some((image) => image.size === "XL")) ||
      (sizeFilter.xxlarge && filtered.some((image) => image.size === "XXL")) ||
      (!sizeFilter.xsmall &&
        !sizeFilter.small &&
        !sizeFilter.medium &&
        !sizeFilter.large &&
        !sizeFilter.xlarge &&
        !sizeFilter.xxlarge); // No size filter

    if (sizeMatch) {
      filtered = filtered.filter(
        (image) =>
          (sizeFilter.xsmall && image.size === "XS") ||
          (sizeFilter.small && image.size === "S") ||
          (sizeFilter.medium && image.size === "M") ||
          (sizeFilter.large && image.size === "L") ||
          (sizeFilter.xlarge && image.size === "XL") ||
          (sizeFilter.xxlarge && image.size === "XXL") ||
          (!sizeFilter.xsmall &&
            !sizeFilter.small &&
            !sizeFilter.medium &&
            !sizeFilter.large &&
            !sizeFilter.xlarge &&
            !sizeFilter.xxlarge)
      );
    }

    // Filter by search query
    if (searchQuery !== "") {
      filtered = filtered.filter((image) =>
        image.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredImages(filtered);
  }, [selectedCategory, genderFilter, sizeFilter, searchQuery, images]);

  const handleImageOverlay = (image) => {
    setSelectedImage(image); // Set the selected image for the modal
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Header />

      {/* Category Navigation */}
      <div className="flex justify-center bg-white p-4 border-b border-gray-200">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 mx-2 text-sm font-medium border-b-2 ${
              selectedCategory === category
                ? "border-black"
                : "border-transparent"
            } hover:border-black`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center p-4 bg-white">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded-md w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
        />
      </div>

      <div className="flex p-6">
        {/* Filter Section */}
        <div className="w-1/4 p-4 bg-white border rounded-lg shadow-lg">
          <h3 className="font-semibold text-gray-700">FILTER BY</h3>
          {/* Gender Filter */}
          <h3 className="font-semibold text-gray-700">PRODUCT FOR</h3>
          <div className="flex flex-col mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={genderFilter.women}
                onChange={() => handleGenderFilter("women")}
              />
              <span>Women</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                checked={genderFilter.men}
                onChange={() => handleGenderFilter("men")}
              />
              <span>Men</span>
            </label>
          </div>

          {/* Size Filter */}
          <h3 className="font-semibold text-gray-700 mt-6">SIZE</h3>
          <div className="flex flex-col mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={sizeFilter.xsmall}
                onChange={() => handleSizeFilter("xsmall")}
              />
              <span>XSmall</span>
            </label>

            <label className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                checked={sizeFilter.small}
                onChange={() => handleSizeFilter("small")}
              />
              <span>Small</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                checked={sizeFilter.medium}
                onChange={() => handleSizeFilter("medium")}
              />
              <span>Medium</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                checked={sizeFilter.large}
                onChange={() => handleSizeFilter("large")}
              />
              <span>Large</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                checked={sizeFilter.xlarge}
                onChange={() => handleSizeFilter("xlarge")}
              />
              <span>XLarge</span>
            </label>
            <label className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                checked={sizeFilter.xxlarge}
                onChange={() => handleSizeFilter("xxlarge")}
              />
              <span>XXLarge</span>
            </label>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-6 bg-gray-100">
          {filteredImages.map((image) => (
            <div
              key={image._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 border"
              style={{ borderColor: "#D4AF37", width: "3in", height: "6in" }} // 3x5 inch container
            >
              <div className="w-full h-3/5">
                <img
                  src={`http://localhost:5000/Images/${image.image}`}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 h-2/5 flex flex-col justify-between">
                <div>
                  <p
                    className="text-lg font-semibold"
                    style={{ color: "#D4AF37" }}
                  >
                    {image.name}
                  </p>
                  <p className="text-gray-700 mt-2">
                    {image.discount ? (
                      <>
                        <span className="line-through text-gray-500">
                          ${image.price}
                        </span>
                        <span
                          className="ml-2 font-bold"
                          style={{ color: "#D4AF37" }}
                        >
                          $
                          {((1 - image.discount / 100) * image.price).toFixed(
                            2
                          )}
                        </span>
                      </>
                    ) : (
                      <span style={{ color: "#D4AF37" }}>
                        ${image.price}
                      </span>
                    )}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Size: {image.size}
                  </p>
                </div>
                <div className="flex flex-col">
                  {/* Conditionally render the Try Fit On button only for Jewellery category */}
                  {image.category === "Jewellery" && (
                    <button
                      className="bg-black text-white px-4 py-2 rounded mb-2"
                      onClick={() => handleImageOverlay(image)}
                    >
                      Try Fit On
                    </button>
                  )}
                  <button className="bg-black text-white px-4 py-2 rounded">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render Fitton component as modal */}
      {showModal && selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="relative bg-white p-4 rounded-md">
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={closeModal}
            >
              &#10005;
            </button>
            <Fitton image={selectedImage} closeModal={closeModal} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ViewProduct;
