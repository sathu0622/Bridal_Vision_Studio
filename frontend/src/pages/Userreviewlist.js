import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Typography, Box, Dialog, DialogTitle, DialogContent } from "@mui/material";
import AddButton from "../componenttitus/AddButton";
import feed from '../assests/feed.jpg';

function Reviewlist() {
  const [reviews, setReviews] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery] = useState("");
  const [viewReview, setViewReview] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/review");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((review) => {
    const { reviewid } = review;
    const query = searchQuery.toLowerCase();
    return (
      (typeof reviewid === "string" && reviewid.toLowerCase().includes(query))
    );
  });

  return (
    <Box flex="1">
      
      <nav className="sticky top-0 z-10 bg-white shadow">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold">Reviews from Customers</h1>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex">
                <Link
                  to="/formreview"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Add Review
                </Link>
                <Link
                  to="/review"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  About us
                </Link>
              </div>
            </div>
          </div>
        </div>
       
      </nav>

     
      <div className='flex justify-between items-center m-5'>
        <Link to='/formreview'>
          <AddButton />
        </Link>
      </div>

     
      <div className="bg-white p-8 rounded-lg shadow-md">
        
      <div 
        className="bg-cover bg-center min-h-screen"
        style={{ backgroundImage: `url(${feed})` }}
      >
        <div className="flex justify-center items-center mb-4">
          <Typography variant="h4">User Reviews</Typography>
        </div>
        <div 
        className="bg-cover bg-center w-full h-full min-h-screen"
        style={{ backgroundImage: `url(${feed})` }}
      >
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Review Details</DialogTitle>
          <DialogContent>
          <Typography variant="body1">
              Product: {viewReview && viewReview.reviewid}
            </Typography>
            <Typography variant="body1">
              Name: {viewReview && viewReview.Name}
            </Typography>
            <Typography variant="body1">
              Email: {viewReview && viewReview.email}
            </Typography>
            <Typography variant="body1">
              Rating: {viewReview && viewReview.rating}
            </Typography>
            <Typography variant="body1">
              Feedback: {viewReview && viewReview.freview}
            </Typography>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, index) => (
            <div key={index} className="bg-gray-100 p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-lg font-bold mb-2">{review.Name}</h3>
              <p className="text-gray-800">product-{review.reviewid}</p><br/>
              <p className="text-gray-800">{review.freview}</p>
              <p className="text-yellow-500 mb-2 ">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)} {/* Simple star rating */}
              </p>
              <button
                onClick={() => {
                  setViewReview(review);
                  setOpenDialog(true);
                }}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>
      <Footer />
    </Box>
    
  );
}

export default Reviewlist;
