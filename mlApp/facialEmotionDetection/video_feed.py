import torch
# import tensorflow as tf
from time import sleep
# from tensorflow.keras.preprocessing.image import img_to_array
# import img_to_array
# from tensorflow.keras.preprocessing import image
import cv2
import numpy as np
import torchvision.transforms as transforms
from PIL import Image
from facenet_pytorch import InceptionResnetV1

def generate_frame():
    face_classifier = cv2.CascadeClassifier('D:/CODING/Hack_Heritage_git/Hack_Heritage/mlApp/facialEmotionDetection/harrcascade_frontallface_default.xml')
    classifier = torch.load('D:/CODING/Hack_Heritage_git/Hack_Heritage/mlApp/facialEmotionDetection/model_ft.h5', map_location='cpu')
    classifier.eval()

    emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']
    score={'Angry':6.33,'Disgust':7.68,'Fear':9.01,'Happy':13,'Neutral':10.34, 'Sad':5, 'Surprise':11.67}
    dic={}
    transform = transforms.Compose([
        transforms.ToPILImage(),
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    cap = cv2.VideoCapture(0)
    end_time = cv2.getTickCount() + 20 * cv2.getTickFrequency()
    while end_time > cv2.getTickCount():
        # _, frame = cap.read()

        # Read a frame from the camera
        ret, frame = cap.read()

        # labels = []
        gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
        faces = face_classifier.detectMultiScale(gray)

        # Convert the frame to a PyTorch tensor
        img_tensor = transform(frame)

        # Add a batch dimension to the tensor
        img_tensor = img_tensor.unsqueeze(0)

        for (x,y,w,h) in faces:
            with torch.no_grad():
                prediction = classifier(img_tensor)
                label=emotion_labels[prediction.argmax()]
                if(label in dic):
                    dic[label]+=1
                else:
                    dic[label]=1
                label_position = (x,y)
                cv2.putText(frame,label,label_position,cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)
                if(label=='Sad' or label=="Disgust"):
                    txt_pos=(x,y+h)
                    cv2.putText(frame,"Negative fealings,recommend help!",txt_pos,cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)
                # else:
                #     cv2.putText(frame,'No Faces',(30,80),cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)
        cv2.imshow('Emotion Detector',frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    return score[max(dic)]

score=generate_frame()
print(score)