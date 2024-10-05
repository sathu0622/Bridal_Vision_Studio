from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
import cvzone

app = Flask(__name__)
CORS(app)

cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
overlay = cv2.imread('jewl.png', cv2.IMREAD_UNCHANGED)

face_detected = False

def generate_frames():
    global face_detected
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
            minNeighbors=8,  # Increased for better accuracy
            minSize=(30, 30)
        )

        face_detected = len(faces) > 0

        if face_detected:
            for (x, y, w, h) in faces:
                # Resize the overlay to fit the neck area
                overlay_resize = cv2.resize(overlay, (int(w * 1.3), int(h * 1.0)))

                # Calculate the position for the overlay on the neck
                x_offset = x - int(w * 0.1)  # Align to the face horizontally
                y_offset = y + int(h * 1.0)  # Position just below the chin

                # Ensure the overlay doesn't go out of frame bounds
                if x_offset < 0: x_offset = 0
                if y_offset < 0: y_offset = 0
                if x_offset + overlay_resize.shape[1] > frame.shape[1]:
                    x_offset = frame.shape[1] - overlay_resize.shape[1]
                if y_offset + overlay_resize.shape[0] > frame.shape[0]:
                    y_offset = frame.shape[0] - overlay_resize.shape[0]

                # Apply the overlay on the frame
                frame = cvzone.overlayPNG(frame, overlay_resize, [x_offset, y_offset])

        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            print("Error: Cannot encode frame.")
            break
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/face_status')
def face_status():
    return jsonify({"face_detected": face_detected})

if __name__ == "__main__":
    app.run(debug=True)



# from flask import Flask, Response, jsonify, request
# from flask_cors import CORS
# import cv2
# import cvzone

# app = Flask(__name__)
# CORS(app)  

# cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
# overlay = None  # Start with no overlay

# face_detected = False

# def generate_frames():
#     global face_detected, overlay
#     cap = cv2.VideoCapture(0)
#     if not cap.isOpened():
#         print("Error: Cannot access the webcam.")
#         return
    
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             print("Error: Cannot read frame from webcam.")
#             break

#         gray_scale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#         faces = cascade.detectMultiScale(gray_scale, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

#         face_detected = len(faces) > 0

#         if face_detected and overlay is not None:
#             for (x, y, w, h) in faces:
#                 overlay_resize = cv2.resize(overlay, (int(w * 1.5), int(h * 1.0)))
#                 x_offset = x - int(w * 0.25)
#                 y_offset = y + int(h * 0.99)
#                 frame = cvzone.overlayPNG(frame, overlay_resize, [x_offset, y_offset])

#         ret, buffer = cv2.imencode('.jpg', frame)
#         if not ret:
#             print("Error: Cannot encode frame.")
#             break
#         frame = buffer.tobytes()
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

#     cap.release()

# @app.route('/video_feed')
# def video_feed():
#     return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# @app.route('/face_status')
# def face_status():
#     return jsonify({"face_detected": face_detected})

# @app.route('/select_image', methods=['POST'])
# def select_image():
#     global overlay
#     data = request.json
#     image_name = data.get('image')
#     overlay = cv2.imread(image_name, cv2.IMREAD_UNCHANGED)
#     return jsonify({"message": "Image selected successfully."})

# if __name__ == "__main__":
#     app.run(debug=True)
