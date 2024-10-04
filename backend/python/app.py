import cv2  # type: ignore
import numpy as np  # type: ignore
import time
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows requests from any origin, helping to fix CORS issues

# Load pre-trained face detector (Haar Cascade Classifier)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Load the gender classification model
gender_proto = 'gender_deploy.prototxt'
gender_model = 'gender_net.caffemodel'
gender_net = cv2.dnn.readNetFromCaffe(gender_proto, gender_model)

def classify_skin_color(bgr_color):
    blue, green, red = bgr_color
    
    if red > 150 and green > 140 and blue > 130:
        return "Light/White"
    elif red > 100 and green > 90 and blue > 80:
        return "Medium/Brown"
    elif red > 60 and green > 50 and blue > 40:
        return "Dark/Black"
    else:
        return "Unknown"

def classify_gender(face_region):
    # Convert face region to blob
    blob = cv2.dnn.blobFromImage(face_region, 1.0, (227, 227), (104.0, 177.0, 123.0), swapRB=False, crop=False)
    gender_net.setInput(blob)
    predictions = gender_net.forward()
    
    # Gender labels based on model output
    gender_labels = ['Male', 'Female']
    gender = gender_labels[np.argmax(predictions)]
    return gender

def process_video_feed():
    cap = cv2.VideoCapture(0)
    face_detected = False
    detection_start_time = None
    skin_tone = None
    gender = None

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5, minSize=(30, 30))

        if len(faces) == 0:
            continue  # No face detected, continue the loop to the next frame

        for (x, y, w, h) in faces:
            if not face_detected:
                face_detected = True
                detection_start_time = time.time()  # Start the timer when a face is detected

            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
            face_region = frame[y:y+h, x:x+w]

            # Convert face region to HSV and classify skin tone
            hsv_face = cv2.cvtColor(face_region, cv2.COLOR_BGR2HSV)
            lower_skin = np.array([0, 20, 70], dtype=np.uint8)
            upper_skin = np.array([20, 255, 255], dtype=np.uint8)
            skin_mask = cv2.inRange(hsv_face, lower_skin, upper_skin)
            skin = cv2.bitwise_and(face_region, face_region, mask=skin_mask)
            mean_skin_color = cv2.mean(skin, mask=skin_mask)

            # Classify skin tone
            skin_tone = classify_skin_color(mean_skin_color[:3])

            # Classify gender
            gender = classify_gender(face_region)

            break

        # If a face was detected, check if 2 seconds have passed
        if face_detected:
            elapsed_time = time.time() - detection_start_time
            if elapsed_time >= 2:
                break  # Stop the video feed after 2 seconds of detection

    cap.release()

    # Check if a face was detected
    if not face_detected:
        return {"error": "Face not detected"}
    
    # Return the classified skin tone and gender as a JSON response
    return {"skin_tone": skin_tone, "gender": gender}

@app.route('/start-video', methods=['GET'])
def start_video():
    # Start video processing and return a response
    result = process_video_feed()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
