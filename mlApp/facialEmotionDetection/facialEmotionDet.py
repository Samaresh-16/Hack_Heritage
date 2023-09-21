import cv2
import os
import torch
from torchvision.transforms import transforms
emotion = "No Face detected"
image_path = "D:/CODING/sbh_git/SBH_Machine_Learners/static/uploads/image.jpg"
classifier_Model = "model_vgg.h5"
face_classifier = cv2.CascadeClassifier('harrcascade_frontallface_default.xml')

emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']

transform = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])


def process_image(img_path, classifier_name):
    # Returns the emotion detected in the image
    classifier = torch.load(classifier_name,map_location ='cpu')
    classifier.eval()
    frame = cv2.imread(img_path)
    gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray)

    # Convert the frame to a PyTorch tensor
    img_tensor = transform(frame)

    # Add a batch dimension to the tensor
    img_tensor = img_tensor.unsqueeze(0)
    face_detected = False
    emotion = "No Face detected"
    for (x,y,w,h) in faces:
        face_detected = True
        with torch.no_grad():
            prediction = classifier(img_tensor)
            label=emotion_labels[prediction.argmax()]
    if face_detected:
        emotion = label
        # if label in ['Angry','Disgust','Fear','Sad']:
        #     emotion = label + " emotion detected. Please Seek Help. Speak with mental health experts."
        # elif label in ['Happy','Neutral', 'Surprise']:
        #     emotion = label + " emotion detected."
        #     if classifier_Model == "model_ft.h5":
        #         emotion += " Predicted using ResNet Model."
        #     else:
        #         emotion += " Predicted using VGG Model."
        # if label not in emotion_labels:
        #     emotion = "No Face detected"
    return(emotion)

def process_video(video_path, classifier_name):
    # Does not return anything but displays the video with emotion labels
    # Press Q to exit.
    classifier = torch.load(classifier_name,map_location ='cpu')
    classifier.eval()
    cap = cv2.VideoCapture(0) # video_path

    while True:
        # _, frame = cap.read()

        # Read a frame from the camera
        ret, frame = cap.read()

        labels = []
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

if __name__ == "__main__":
    print(process_image(image_path, classifier_Model))
    process_video(image_path, classifier_Model)