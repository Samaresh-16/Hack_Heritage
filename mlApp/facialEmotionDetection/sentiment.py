
import re
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import pickle
loaded_model = pickle.load(open('finalized_model.sav', 'rb'))
cv= pickle.load(open('cv.sav','rb'))
lm = WordNetLemmatizer()
dic={'anger':6.6,'fear':8.2,'joy':13,'love':11.4, 'sadness':5, 'surprise':9.8}
def text_transformation(df_col):
    corpus = []
    for item in df_col:
        new_item = re.sub('[^a-zA-Z]',' ',str(item))
        new_item = new_item.lower()
        new_item = new_item.split()
        new_item = [lm.lemmatize(word) for word in new_item if word not in set(stopwords.words('english'))]
        corpus.append(' '.join(str(x) for x in new_item))
    return corpus
def sentiment_predictor(input):
    input = text_transformation(input)
    transformed_input = cv.transform(input)
    prediction = loaded_model.predict(transformed_input)
    print(dic[prediction[0]])

ip=input("Enter the review: ")
sentiment_predictor(ip)