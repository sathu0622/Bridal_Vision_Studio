import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Fitton = ({ image }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      if (imageFile instanceof Blob) {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]); // Extract base64 without data:image prefix
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      } else {
        reject("Provided image is not a valid File or Blob.");
      }
    });
  };

  useEffect(() => {
    const sendImageToBackend = async () => {
      try {
        let imageData;

        if (image instanceof File || image instanceof Blob) {
          imageData = await convertImageToBase64(image);
        } else if (typeof image === "string" && image.startsWith("data:image/")) {
          imageData = image.split(",")[1]; // Handle base64 string starting with 'data:image/'
        } else {
          console.error("Unsupported image format:", image);
          MySwal.fire({
            title: "Error",
            text: "Unsupported image format. Please upload a valid image.",
            icon: "error",
          });
          return;
        }

        const response = await fetch("http://127.0.0.1:5000/api/overlay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: imageData }),
        });

        const result = await response.json();
        if (response.ok) {
          console.log(result.message); // Success message
        } else {
          MySwal.fire({
            title: "Error",
            text: result.error || "Failed to load overlay image.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error sending image to backend:", error);
        MySwal.fire({
          title: "Error",
          text: "Could not send image to backend.",
          icon: "error",
        });
      }
    };

    if (image) {
      sendImageToBackend();
    }
  }, [image]);

  useEffect(() => {
    let intervalId;

    if (isStreaming) {
      intervalId = setInterval(() => {
        fetch("http://127.0.0.1:5000/face_status")
          .then((response) => response.json())
          .then((data) => {
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
          .catch((error) =>
            console.error("Error fetching face status:", error)
          );
      }, 1000); // Check every second
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
    setAlertShown(false); // Reset the alert state
  };

  return (
    <div className="max-w-40 mt-4">
      <button
        onClick={handleStartStop}
        className="border-2 p-2 border-yellow-400 rounded-md hover:bg-yellow-400 hover:transition-transform"
      >
        {isStreaming ? "Stop Try On" : "Start Try On"}
      </button>
      <br />
      <br />
      {isStreaming && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-95 z-50">
          <div className="relative p-5 bg-white rounded-md">
            <img
              src="http://127.0.0.1:5000/video_feed"
              alt="Video Feed"
              className="w-full h-full"
              style={{
                maxWidth: "calc(100vw - 40px)",
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
  );
};

export default Fitton;
