import React from 'react';
import Bgg from '../assests/bgg.png';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
//import Bgg3 from '../assests/bgg3.jpg'

function Body() {
  return (
    <>
    <Header/>
     <div className="flex flex-wrap-reverse md:flex-row items-center md:items-center">
        <div className="w-full md:w-1/2 p-5 flex flex-col justify-center items-center text-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-4">Bridal Vision Studio</h2>
            <p className="text-lg mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.
            </p>
            <div className="flex flex-col md:flex-row md:h-100 md:w-15  md:justify-center space-y-3 md:space-y-0 md:space-x-3">
              <button className="border-2 p-8 border-red-400 rounded-md hover:bg-red-400 hover:transition-transform ">Login</button>
              <button className="border-2 p-8 border-red-400 rounded-md  hover:bg-red-400 hover:transition-transform ">Sign Up</button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4">
      
          <img src={Bgg} alt="Description" className="object-cover w-full h-full rounded-lg" />
        
        </div>
      </div>
      <br />
      <br />
      <hr />
      <Note/>
      {/* <div className='m-4'>
      <img src={Bgg3} alt="Description" className="object-cover w-full h-full rounded-lg " />
    </div> */}
      <Footer/>
    </>
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