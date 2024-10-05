import React  from 'react';
import { Link} from 'react-router-dom';
import Button from '../componenttitus/Button'; // Assuming Button component is imported correctly
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {useLocation} from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer';


const Reviewview = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const review = JSON.parse(searchParams.get('review'));


  const handlePrint = () => {
    if (!review) return; 
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Define the content to be added to the PDF
    const content = `
    Review Receipt
    Product: ${review?.reviewid}
    Name: ${review?.Name}
    Email: ${review?.email}
    Rating: ${review?.rating}
    Feedbacks: ${review?.freview}
    `;

    // Add the content to the PDF
    doc.text(content, 10, 10);

    // Save the PDF
    doc.save('Review_Details.pdf');
  };

  return (
    <div className='relative'>
      <div id="pdfContent" className='flex flex-col bg-bgc rounded-xl w-[600px] p-4 mx-auto font-BreeSerif text-ternary'>
        <h1 className='text-3xl my-4 text-center font-semibold'> Review Form</h1>
        <div className='my-4'>
          <span className='text-xl mr-4'>Product :</span>
          <span>{review?.reviewid}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4'>Name :</span>
          <span>{review?.Name}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4'>Email :</span>
          <span>{review?.email}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4'>Rating :</span>
          <span>{review?.rating}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4'>Feedbacks:</span>
          <span>{review?.freview}</span>
        </div>
        
        <div className='flex justify-left gap-x-20'>
          <Link to="/listreview">
            <Button onClick={handlePrint}>Print</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reviewview;


