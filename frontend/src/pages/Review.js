import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import feed from '../assests/feed.jpg';

export const Review = () => {
  return (
    <div>
     <Header/>
     <div 
        className="bg-cover bg-center w-full h-full min-h-screen"
        style={{ backgroundImage: `url(${feed})` }}
      >
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mt-8 mb-12">User Review </h1>
      <div className="flex justify-around bg-zinc-900">
        <div className="w-60 h-100 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-red-600 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
        <img
        src="https://image6.photobiz.com/8933/31_20221228130420_9131284_large.jpg"
        
        className="w-full h-40 rounded-2xl mb-3"
      /><div>
            <p className="font-bold text-lg">We are</p>
            <p className="text-sm">You can get more details and you can be able to access variable things from our website.</p>
          </div>
          <Link to="/listreview">
          <button className="bg-red-400 font-bold text-sm p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">View AdminSite</button>
          </Link>
        </div>
        <div className="w-60 h-100 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-red-600 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
        <img
        src="https://img.freepik.com/free-psd/customer-feedback-review-instagram-post-template_47987-19741.jpg?t=st=1728047491~exp=1728051091~hmac=5a7b3282524f14802a444ccc02d1ced34755e5d8a469fd4edf2bdaeb8401e30c&w=740"
          alt="Card Image"
        className="w-full h-40 rounded-2xl mb-3"
      /> <div>
            <p className="font-bold text-lg">About Us</p>
            <p className="text-sm">Your reviews will be shown here, you can make your decision confidentaly.</p>
          </div>
          <Link to="/Userreviewlist">
          <button className="bg-red-400 font-bold text-sm p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">View Reviews</button>
          </Link>
        </div>
        <div className="w-60 h-100 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-red-600 hover:shadow-2xl hover:shadow-sky-400 transition-shadow">
        <img
        src="https://get.doordash.com/images/subscribe-blog.svg"
        alt="Card Image"
        className="w-full h-40 rounded-2xl mb-3"
      /><div>
            
            <p className="font-bold text-lg">Review</p>
           
            <p className="text-sm">Give you valuable reviews to us to make our customer service move usable for you</p>
          </div>
          <Link to="/formreview">
          <button className="bg-red-400 font-bold text-sm p-2 px-6 rounded-xl hover:bg-sky-500 transition-colors">Give review</button>
          </Link>
        </div>
        
      </div>
     </div>
      <p className="mt-8 text-center text-gray-700">Achieving your bridal goals has never been easier!</p>
  
      <Footer/>
        </div>
  )
};

export default Review;