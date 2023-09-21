from fastapi import APIRouter, Request, File, UploadFile
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import cv2
import os
import torch
from torchvision.transforms import transforms


router=APIRouter()

templates = Jinja2Templates(directory="templates")





def process_image(img_path, classifier_name):

    emotion = "No Face detected"
    classifier_Model = "model_vgg.h5"
    face_classifier = cv2.CascadeClassifier('facialEmotionDetection\harrcascade_frontallface_default.xml')

    emotion_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']

    transform = transforms.Compose([
        transforms.ToPILImage(),
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
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

router.mount("/static", StaticFiles(directory="static"), name="static")

input_image_path=""
@router.post("/")
async def upload_image(request: Request,file: UploadFile):
    # Check if the uploaded file is an image
    if file.content_type.split('/')[0] != 'image':
        return {"error": "Only image files are allowed."}

    # Read and save the uploaded image
    with open(f"static/uploads/{file.filename}", "wb") as f:
        f.write(file.file.read())
    global input_image_path
    input_image_path="static/uploads/"+file.filename
    print(input_image_path)
    emotion=process_image(input_image_path,"facialEmotionDetection\model_vgg.h5")
    print(emotion)
    return templates.TemplateResponse("index.html", {"request": request,"emotion":emotion,"uploaded":input_image_path})

@router.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request,"emotion":"","uploaded":""})