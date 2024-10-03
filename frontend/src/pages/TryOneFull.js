import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import jewel1 from "../jewels/jewel1.png";
import jewel2 from "../jewels/jewell2.png";
import jewel3 from "../jewels/jewel3.png";
import jewel4 from "../jewels/jewel4.png";
import jewel5 from "../jewels/jewel5.png";
import jewel6 from "../jewels/jewel6.png";
import jewel7 from "../jewels/jewel7.png";
import jewel8 from "../jewels/jewel8.png";
import jewel9 from "../jewels/jewel9.png";
import jewel10 from "../jewels/jewel10.png";
import jewel11 from "../jewels/new.png";
import MySwal from 'sweetalert2';

function TryOneFull() {
  const images = [
    jewel1, jewel2, jewel3, jewel4, jewel5,
    jewel6, jewel7, jewel8, jewel9, jewel10, jewel11,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleTryOn = () => {
    const selectedImage = images[currentIndex];

    const img = new Image();
    img.src = selectedImage;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 640;
      const scaleFactor = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleFactor;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64Image = reader.result.split(',')[1];
            fetch('http://127.0.0.1:5000/api/overlays', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: base64Image }),
            })
              .then(response => response.json())
              .then(data => {
                console.log('Image upload success:', data);
                setIsStreaming(true);
              })
              .catch(error => {
                console.error('Error:', error);
                MySwal.fire({
                  title: "Error!",
                  text: `Image upload failed: ${error.message}`,
                  icon: "error",
                });
              });
          };
        } else {
          console.error('Canvas is empty. Blob creation failed.');
          MySwal.fire({
            title: "Error!",
            text: "Failed to create image blob.",
            icon: "error",
          });
        }
      }, 'image/jpeg', 0.7);
    };
  };

  useEffect(() => {
    let intervalId;

    if (isStreaming) {
      intervalId = setInterval(() => {
        fetch("http://127.0.0.1:5000/faces_status")
          .then(response => response.json())
          .then(data => {
            if (!data.face_detected && !alertShown) {
              MySwal.fire({
                title: "Face Not Detected?",
                text: "Don't be shy, show your cute face!",
                icon: "question",
              });
              setAlertShown(true);
            } else if (data.face_detected) {
              setAlertShown(false);
            }
          })
          .catch(error => console.error("Error fetching face status:", error));
      }, 1000);
    }

    return () => {
      if (isStreaming) {
        clearInterval(intervalId);
        setIsStreaming(false);
      }
    };
  }, [isStreaming, alertShown]);

  const handleStartStop = () => {
    setIsStreaming((prevState) => !prevState);
    setAlertShown(false);
  };

  return (
    <>
      <Header />
      <div className="relative flex flex-col items-center h-screen bg-gray-100 p-4 lg:p-8">
        <div className="flex justify-center items-center space-x-4 overflow-auto mb-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`jewel ${index + 1}`}
              className={`w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 object-cover transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-40"}`}
            />
          ))}
        </div>

        <button
          className="px-6 py-3 text-white bg-gray-800 bg-opacity-50 rounded-lg backdrop-blur-md hover:bg-opacity-70 transition-all"
          onClick={handleTryOn}
        >
          Try On
        </button>

        <div className="absolute inset-x-0 flex justify-between items-center w-full px-4 lg:px-20">
          <button
            onClick={handlePrev}
            className="text-white text-xl bg-gray-800 bg-opacity-50 p-2 rounded-full"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="text-white text-xl bg-gray-800 bg-opacity-50 p-2 rounded-full"
          >
            &#8594;
          </button>
        </div>

        {isStreaming && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-95 z-50 p-4">
            <div className="relative bg-white rounded-md w-full max-w-4xl mx-auto">
              <img
                src="http://127.0.0.1:5000/video_feeds"
                alt="Video Feed"
                className="w-full h-auto"
                style={{
                  maxHeight: "calc(100vh - 40px)",
                  backgroundColor: "#febe00",
                }}
              />
              <button
                onClick={handleStartStop}
                className="absolute top-2 right-2 text-white bg-red-600 px-4 py-2 rounded-md"
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default TryOneFull;
