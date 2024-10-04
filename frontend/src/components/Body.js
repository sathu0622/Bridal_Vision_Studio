import React from 'react';
import Bgg from '../assests/bgg3.jpg';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import FaceBox from '../components/FaceBox'

function Body() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-wrap-reverse md:flex-row flex-1 items-stretch md:items-center">
        <div className="w-full md:w-1/2 p-5 flex flex-col justify-center items-center text-center">
        <br />
      <br />
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-4">Bridal Vision Studio</h2>
            <p className="text-lg mb-6">
              Welcome to Bridal Vision Studio! We are delighted to have you here, where creativity meets innovation. Whether you're here to explore our studio, engage with our services, or simply browse through our offerings, we encourage you to make the most of your experience. If you don't have an account yet, please sign up to unlock all features. Already a member? Just log in to continue your journey with us!
            </p>
            <div className="flex flex-col md:flex-row md:h-100 md:w-15 md:justify-center space-y-3 md:space-y-0 md:space-x-3">
              <button className="border-2 p-8 border-red-400 rounded-md hover:bg-red-400 hover:transition-transform">
                <a href='/login'>
                Login
                </a>
              </button>
              <button className="border-2 p-8 border-red-400 rounded-md hover:bg-red-400 hover:transition-transform">
              <a href='/register'>
              Sign Up
                </a>
              </button>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 p-4 flex items-center justify-center">
          <img src={Bgg} alt="Description" className="object-cover w-full h-full rounded-lg" />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Note />
      <FaceBox />
      <Footer />
    </div>
  );
}

export default Body;


// import axios from 'axios';

// function Body() {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleFitOnClick = (imageSrc) => {
//     setSelectedImage(imageSrc);
//     axios.post('http://localhost:5000/select_image', { image: imageSrc })
//       .then(response => {
//         console.log(response.data.message);
//       })
//       .catch(error => {
//         console.error("There was an error sending the image!", error);
//       });
//   };

//   return (
//     <div className="flex flex-wrap-reverse md:flex-row items-center md:items-center">
//       <div className="w-full md:w-1/2 p-5 flex flex-col justify-center items-center text-center">
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-4xl font-bold mb-4">Bridal Vision Studio</h2>
//           <p className="text-lg mb-6">
//             Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//           </p>
//           <div className="flex flex-col md:flex-row md:h-100 md:w-15 md:justify-center space-y-3 md:space-y-0 md:space-x-3">
//             <button 
//               className="border-2 p-8 border-red-400 rounded-md hover:bg-red-400 hover:transition-transform"
//               onClick={() => handleFitOnClick('image1.png')}
//             >
//               Try Fit On
//             </button>
//             <button 
//               className="border-2 p-8 border-red-400 rounded-md hover:bg-red-400 hover:transition-transform"
//               onClick={() => handleFitOnClick('jewel1.png')}
//             >
//               Try Fit On
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="w-full md:w-1/2 p-4">
//         <img src={selectedImage || 'defaultImage.png'} alt="Description" className="object-cover w-full h-full rounded-lg" />
//       </div>
//     </div>
//   );
// }

// export default Body;