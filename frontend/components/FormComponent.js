import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const FormComponent = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.canceled) {
            setSelectedImage(result.uri);
        }
    };

    const uploadImage = async () => {
        if (!selectedImage) {
            return;
        }

        const formData = new FormData();
        formData.append('image', {
            uri: selectedImage,
            name: 'photo.jpg',
            type: 'image/jpg',
        });

        try {
            const response = await axios.post('https://5d8e-61-12-70-61.ngrok-free.app/upload_image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            // Handle the API response here
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={pickImage}>
                <Text>Select Image</Text>
            </TouchableOpacity>
            {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
            <TouchableOpacity onPress={uploadImage}>
                <Text>Upload Image</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FormComponent;
