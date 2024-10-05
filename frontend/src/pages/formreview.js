import React ,{useState}from "react";

import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import review from '../assests/review.jpg';

export default function Order() {
  const [formData, setFormData] = useState({
    reviewid: '',
    Name: '',
    email: '',
    rating: '',
    freview: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
  
    // Validate if the value is numeric and within the range of 1-5
    if (name === "rating" && /^[1-5]$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    } else if (name !== "rating") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
  
    // Validate if the value contains only alphabetic characters
    if (name === "reviewid" && /^[a-zA-Z\s]*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    } else if (name !== "reviewid") {
      setFormData({ ...formData, [name]: value });
    } else if (value === "") {
      // Allow deletion of the first letter if the value is empty
      setFormData({ ...formData, [name]: "" });
    }
  };

  const handleChange3 = (e) => {
    const { name, value } = e.target;
  
   if (name === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    setFormData({ ...formData, [name]: value });
  } else {
    // For other input fields or if the input value doesn't match the email format, update the state with the new value directly
    setFormData({ ...formData, [name]: value });
  }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add validation here if needed
      if (formData.Name.match(/\d+/g)) {
        alert("Name should not contain numbers");
        return;
      }
      if (!formData.email.includes("@gmail.com")) {
        alert("Gmail not correctly given");
        return;
      }
      // Add additional validation for other fields if needed
      
      // Proceed with form submission if all validations pass
      const res = await axios.post('http://127.0.0.1:5000/api/reviewbills', formData);
      console.log(res.data.message); // Assuming the server sends a success message
      alert('Form submitted successfully!');
      // Reset form fields after successful submission
      setFormData({
        reviewid: '',
        Name: '',
        email: '',
        rating: '',
        freview: ''
      });
      window.location.href = "/Userreviewlist";
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, show error message, etc.
    }
  };


  return (
    <div className="bg-white-400">
      <Header/>
      <nav className="sticky top-0 z-10 bg-white shadow">
      
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold">Make Review</h1>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex">
              <Link
                to="/Userreviewlist" // Use "to" instead of "href"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Reviews
              </Link>
               
                <a
                  href="#order"
                  className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Review Form
                </a>
              </div>
            </div>

           
          </div>
        </div>

       
         
      </nav>

      <main>
        
        <div 
        className="bg-cover bg-center w-full h-full min-h-screen"
        style={{ backgroundImage: `url(${review})` }}
      >
        <div className="max-w-lg mx-auto p-4" id="order">
          <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <br/><br/><br/><br/>
              <label htmlFor="reviewid" className="block text-sm font-medium text-zinc-700">Product</label>
              <div className="block text-sm font-medium text-zinc-700">
                <input
                  type="text"
                  name="reviewid"
                  id="reviewid"
                  value={formData.reviewid}
                  onChange={handleChange2}
                  placeholder="What did You buy?"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-zinc-300 rounded-md"
                ></input>
              </div>
            </div>
            <div>
              <label htmlFor="Name" className="block text-sm font-medium text-zinc-700">Name</label>
              <div className="block text-sm font-medium text-zinc-700">
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  placeholder=" Name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-zinc-300 rounded-md"
                ></input>
              </div>
            </div>
           
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700">Email</label>
              <div className="block text-sm font-medium text-zinc-700">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange3}
                  placeholder=" XXXX@gmail.com"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-zinc-300 rounded-md"
                ></input>
              </div>
            </div>
           
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-zinc-700">Rating</label>
              <div className="block text-sm font-medium text-zinc-700">
                <input
                  type="number"
                  name="rating"
                  id="rating"
                  value={formData.rating}
                  onChange={handleChange1}
                  placeholder=" rating (1-5)"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-zinc-300 rounded-md"
                ></input>
              </div>
            </div>
           

            <div>
              <label htmlFor="freview" className="block text-sm font-medium text-zinc-700">Feedback</label>
              <div className="block text-sm font-medium text-zinc-700">
                <input
                  type="text"
                  name="freview"
                  id="freview"
                  value={formData.freview}
                  onChange={handleChange}
                  placeholder=" give your opinion"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-zinc-300 rounded-md"
                ></input>
              </div>
            </div>
            <br/>
            
            <Link to="/Userreviewlist" onClick={handleSubmit}>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Submit
            </button>
            </Link>

            
          </form>
        </div>
        </div>
        <Footer/>
      </main>
    </div>
  );
}