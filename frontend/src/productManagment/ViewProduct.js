import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Poster from "../assests/poster.jpg";

const ViewProduct = () => {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [genderFilter, setGenderFilter] = useState({ women: false, men: false });
    const [sizeFilter, setSizeFilter] = useState({
        xsmall: false, small: false, medium: false, large: false, xlarge: false, xxlarge: false
    });

    const categories = ["All", "Coat", "Saree", "Jewellery", "Earring"];
    const userEmail = sessionStorage.getItem("userEmail");

    // Fetch images from the server on component mount
    useEffect(() => {
        axios.get('http://localhost:5000/api/products/getImages')
            .then(res => {
                setImages(res.data);
                setFilteredImages(res.data);
                console.log(userEmail);
            })
            .catch(err => console.error(err));
    }, [userEmail]);

    // Handle category selection change
    const handleCategoryChange = (category) => setSelectedCategory(category);

    // Handle gender and size filter changes
    const handleGenderFilter = (gender) => setGenderFilter(prev => ({ ...prev, [gender]: !prev[gender] }));
    const handleSizeFilter = (size) => setSizeFilter(prev => ({ ...prev, [size]: !prev[size] }));

    // Apply filtering based on category, gender, size, and search query
    useEffect(() => {
        let filtered = images;

        // Filter by category
        if (selectedCategory !== "All") {
            filtered = filtered.filter(image => image.category === selectedCategory);
        }

        // Filter by gender
        const genderMatch = (genderFilter.women || genderFilter.men) ? filtered.some(image => (
            (genderFilter.women && image.gender === 'Female') ||
            (genderFilter.men && image.gender === 'Male')
        )) : true;
        if (genderMatch) {
            filtered = filtered.filter(image => (
                (genderFilter.women && image.gender === 'Female') ||
                (genderFilter.men && image.gender === 'Male') ||
                (!genderFilter.women && !genderFilter.men)
            ));
        }

        // Filter by size
        const sizeMatch = Object.values(sizeFilter).some(isSelected => isSelected)
            ? filtered.some(image => (
                (sizeFilter.xsmall && image.size === 'XS') ||
                (sizeFilter.small && image.size === 'S') ||
                (sizeFilter.medium && image.size === 'M') ||
                (sizeFilter.large && image.size === 'L') ||
                (sizeFilter.xlarge && image.size === 'XL') ||
                (sizeFilter.xxlarge && image.size === 'XXL')
            )) : true;
        if (sizeMatch) {
            filtered = filtered.filter(image => (
                (sizeFilter.xsmall && image.size === 'XS') ||
                (sizeFilter.small && image.size === 'S') ||
                (sizeFilter.medium && image.size === 'M') ||
                (sizeFilter.large && image.size === 'L') ||
                (sizeFilter.xlarge && image.size === 'XL') ||
                (sizeFilter.xxlarge && image.size === 'XXL') ||
                (!Object.values(sizeFilter).some(isSelected => isSelected))
            ));
        }

        // Filter by search query
        if (searchQuery !== "") {
            filtered = filtered.filter(image =>
                image.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredImages(filtered);
    }, [selectedCategory, genderFilter, sizeFilter, searchQuery, images]);

    // Reset all filters
    const resetFilters = () => {
        setGenderFilter({ women: false, men: false });
        setSizeFilter({
            xsmall: false, small: false, medium: false, large: false, xlarge: false, xxlarge: false
        });
        setSelectedCategory("All");
        setSearchQuery("");
    };

    return (
        <div>
            <Header />
            <img
    src={Poster} // Your poster image source
    alt="BVS Logo"
    className="w-full h-[350px] mt-4 mb-2 object-cover object-top" // Full width, small height, and crop from bottom
/>


            {/* Category Selector */}
            <div className="flex justify-center bg-white p-4 border-b border-gray-200">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`px-4 py-2 mx-2 text-sm font-medium border-b-2 ${selectedCategory === category ? 'border-black' : 'border-transparent'} hover:border-black`}
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex">
                {/* Filter Sidebar */}
                <div className="w-1/4 p-4 bg-white border rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter By</h3>

                    {/* Gender Filter */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-700 mb-3">Product For</h4>
                        <div className="flex flex-col space-y-3">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={genderFilter.women}
                                    onChange={() => handleGenderFilter('women')}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <span className="text-gray-700">Women</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={genderFilter.men}
                                    onChange={() => handleGenderFilter('men')}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <span className="text-gray-700">Men</span>
                            </label>
                        </div>
                    </div>

                    {/* Size Filter */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-700 mb-3">Size</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'].map(size => (
                                <label key={size} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={sizeFilter[size]}
                                        onChange={() => handleSizeFilter(size)}
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                    />
                                    <span className="text-gray-700 capitalize">{size.replace("x", "X").toUpperCase()}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Reset Filters Button */}
                    <button
                        className="w-full py-2 mt-4 text-white bg-purple-500 hover:bg-purple-600 font-semibold rounded-lg transition-all"
                        onClick={resetFilters}
                    >
                        Reset Filters
                    </button>
                </div>

                {/* Product Grid */}
                <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-6 bg-gray-100">
                    {filteredImages.map(image => (
                        <div
                            key={image._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 border"
                            style={{ borderColor: '#800080', width: '3in', height: '5in' }}
                        >
                            <div className="w-full h-3/5">
                                <img src={`http://localhost:5000/Images/${image.image}`} alt={image.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4 h-2/5 flex flex-col justify-between">
                                <div>
                                    <p className="text-lg font-semibold" style={{ color: '#800080' }}>{image.name}</p>
                                    <p className="text-gray-700 mt-2">
                                        {image.discount ? (
                                            <>
                                                <span className="line-through text-gray-500">Rs.{image.price}</span>
                                                <span className="ml-2 font-bold" style={{ color: '#800080' }}>
                                                    Rs.{((1 - image.discount / 100) * image.price).toFixed(2)}
                                                </span>
                                            </>
                                        ) : (
                                            <span style={{ color: '#800080' }}>Rs.{image.price}</span>
                                        )}
                                    </p>
                                    <p className="text-gray-600 text-sm mt-2">Size: {image.size}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        className="px-4 py-2 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 rounded-md transition"
                                        onClick={() => console.log('Buy Now')}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ViewProduct;
