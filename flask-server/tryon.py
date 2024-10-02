from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import cv2
import numpy as np
import base64

app = Flask(__name__)
CORS(app)

cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
overlay = None  # Global variable to store the overlay image
face_detected = False

def generate_frames():
    global face_detected, overlay
    cap = cv2.VideoCapture(0)  # Use the default camera
    if not cap.isOpened():
        print("Error: Cannot access the webcam.")
        return

    print("Webcam accessed successfully.")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Cannot read frame from webcam.")
            break

        gray_scale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = cascade.detectMultiScale(
            gray_scale,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30)
        )

        face_detected = len(faces) > 0

        if face_detected and overlay is not None:
            for (x, y, w, h) in faces:
                print(f"Face detected at X: {x}, Y: {y}, Width: {w}, Height: {h}")

                # Resize the overlay to fit the face width
                overlay_resize = cv2.resize(overlay, (int(w * 1.3), int(h * 0.7)))

                # Split the overlay into RGB and Alpha channels
                if overlay_resize.shape[2] == 4:
                    overlay_rgb = overlay_resize[:, :, :3]
                    overlay_alpha = overlay_resize[:, :, 3]  # Alpha channel (transparency)
                else:
                    overlay_rgb = overlay_resize
                    overlay_alpha = np.ones(overlay_resize.shape[:2], dtype=np.uint8) * 255

                # Calculate the position for the overlay
                x_offset = max(0, x - int(w * 0.15))  # Slightly adjust left
                y_offset = min(frame.shape[0] - overlay_resize.shape[0], y + h)  # Below the face

                # Check if overlay fits within frame bounds
                if x_offset + overlay_resize.shape[1] <= frame.shape[1] and y_offset + overlay_resize.shape[0] <= frame.shape[0]:
                    # Extract the region of interest (ROI) where the overlay will be applied
                    roi = frame[y_offset:y_offset + overlay_resize.shape[0], x_offset:x_offset + overlay_resize.shape[1]]

                    # Normalize alpha mask to [0, 1] range
                    mask = overlay_alpha / 255.0
                    inv_mask = 1.0 - mask

                    # Apply the overlay: blend the RGB channels using the alpha mask
                    for c in range(3):  # Iterate over the RGB channels
                        roi[:, :, c] = (overlay_rgb[:, :, c] * mask + roi[:, :, c] * inv_mask)

                    # Replace the ROI back into the original frame
                    frame[y_offset:y_offset + overlay_resize.shape[0], x_offset:x_offset + overlay_resize.shape[1]] = roi
                else:
                    print("Overlay goes out of bounds, skipping overlay application.")

        # Encode the frame and yield it to the client
        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            print("Error: Cannot encode frame.")
            break
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_feeds')
def video_feeds():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/faces_status')
def faces_status():
    global face_detected
    return jsonify({"face_detected": face_detected})

@app.route('/api/overlays', methods=['POST'])
def upload_image():
    global overlay
    data = request.get_json()
    image_b64 = data['image']
    
    # Decode the base64 string back into image bytes
    image_bytes = base64.b64decode(image_b64)
    
    # Convert the image bytes to a NumPy array
    nparr = np.frombuffer(image_bytes, np.uint8)
    
    # Decode the NumPy array into an image (load with unchanged alpha channel)
    overlay = cv2.imdecode(nparr, cv2.IMREAD_UNCHANGED)
    
    # Check if the image has 4 channels (RGBA)
    if overlay.shape[2] == 4:
        print("Overlay image loaded successfully with an alpha channel.")
    else:
        print("Overlay image does not have an alpha channel. Adding alpha channel.")
        # Add an alpha channel if the image doesn't have one (assume it's fully opaque)
        overlay = cv2.cvtColor(overlay, cv2.COLOR_BGR2BGRA)
    
    return jsonify({"success": True}), 200

if __name__ == '__main__':
    app.run(debug=True)
