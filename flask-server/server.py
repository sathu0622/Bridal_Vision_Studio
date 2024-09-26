from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import cv2
import cvzone
import numpy as np
import base64

app = Flask(__name__)
CORS(app)

cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
overlay = None  
face_detected = False

def generate_frames():
    global face_detected, overlay
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Cannot access the webcam.")
        return
    
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Cannot read frame from webcam.")
            break

        gray_scale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = cascade.detectMultiScale(
            gray_scale, 
            scaleFactor=1.1, 
            minNeighbors=8,  
            minSize=(30, 30)
        )

        face_detected = len(faces) > 0

        if face_detected and overlay is not None:
            for (x, y, w, h) in faces:
                overlay_resize = cv2.resize(overlay, (int(w * 1.3), int(h * 1.0)))
                x_offset = x - int(w * 0.1)  
                y_offset = y + int(h * 1.0)  

                x_offset = max(x_offset, 0)
                y_offset = max(y_offset, 0)
                if x_offset + overlay_resize.shape[1] > frame.shape[1]:
                    x_offset = frame.shape[1] - overlay_resize.shape[1]
                if y_offset + overlay_resize.shape[0] > frame.shape[0]:
                    y_offset = frame.shape[0] - overlay_resize.shape[0]

                frame = cvzone.overlayPNG(frame, overlay_resize, [x_offset, y_offset])

        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            print("Error: Cannot encode frame.")
            break
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/api/overlay', methods=['POST'])
def overlay_image():
    global overlay
    data = request.get_json()
    image_base64 = data.get('image')
    
    if image_base64:
        image_data = base64.b64decode(image_base64)
        np_arr = np.frombuffer(image_data, np.uint8)
        overlay = cv2.imdecode(np_arr, cv2.IMREAD_UNCHANGED)

        if overlay is None:
            print("Overlay image could not be loaded.")
            return jsonify({"error": "Could not decode overlay image."}), 400

        print("Overlay image successfully set.")
        return jsonify({"message": "Overlay image set successfully."}), 200
    else:
        print("No image data received.")
        return jsonify({"error": "No image data provided."}), 400

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/face_status')
def face_status():
    return jsonify({"face_detected": face_detected})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
