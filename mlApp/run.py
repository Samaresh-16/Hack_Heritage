from flask import Flask, request, jsonify, Response
import cv2
import os
import torch
from torchvision.transforms import transforms

app = Flask(__name__)
emotion = "No Face detected"
image_path = ""
classifier_Model = "model_ft.h5"
face_classifier = cv2.CascadeClassifier('harrcascade_frontallface_default.xml')

emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

transform = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def generate_frames(classifier_Model):
    classifier = torch.load(classifier_Model, map_location='cpu')
    classifier.eval()
    camera = cv2.VideoCapture(0)  # 0 -> index of camera
    end_time = cv2.getTickCount() + 20 * cv2.getTickFrequency()
    while end_time > cv2.getTickCount():
        success, frame = camera.read()
        if not success:
            break
        else:
            labels = []
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_classifier.detectMultiScale(gray)

            # Convert the frame to a PyTorch tensor
            img_tensor = transform(frame)

            # Add a batch dimension to the tensor
            img_tensor = img_tensor.unsqueeze(0)
            face_detected = False
            for (x, y, w, h) in faces:
                face_detected = True
                with torch.no_grad():
                    prediction = classifier(img_tensor)
                    label = emotion_labels[prediction.argmax()]
            if face_detected:
                global emotion
                emotion = label
                if label in ['Angry', 'Disgust', 'Fear', 'Sad']:
                    emotion = label + " emotion detected. Please Seek Help. Speak with mental health experts."
                elif label in ['Happy', 'Neutral', 'Surprise']:
                    emotion = label + " emotion detected."
                if label not in emotion_labels:
                    emotion = "No Face detected"
            else:
                emotion = "No Face detected"
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    camera.release()

@app.route('/api/emotion', methods=['GET'])
def get_emotion():
    return jsonify({'emotion': emotion})

@app.route('/api/change_model', methods=['POST'])
def change_model():
    if request.method == "POST":
        model = request.json.get('model')
        global classifier_Model
        classifier_Model = model
    return jsonify({'message': 'Model changed successfully', 'model': classifier_Model})

@app.route('/api/video_feed', methods=['GET'])
def video_feed():
    return Response(generate_frames(classifier_Model=classifier_Model),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
