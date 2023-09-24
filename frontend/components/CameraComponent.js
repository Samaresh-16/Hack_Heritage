import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, Pressable, SafeAreaView, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import { ML_URL } from '../config';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';


const CameraComponent = ({ onPictureTaken }) => {
    const { mood, setMood, score, setScore } = useContext(AuthContext);
    const cameraRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [photo, setPhoto] = useState();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [spinning, setSpinning] = useState(false);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === undefined) reuturn(
        <Text>Requesting Permission</Text>
    );
    if (!hasPermission) return (
        <Text>Permissions not granted, please change this in settings</Text>
    )

    const takePicture = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        }

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    if (photo) {
        const uploadImage = async () => {
            setSpinning(true);
            setButtonDisabled(true);
            if (!photo) {
                setButtonDisabled(false);
                setSpinning(false);

                return;

            }

            // console.log(photo);

            const formData = new FormData();
            formData.append('file', {
                uri: photo.uri,
                name: 'photo.jpg',
                type: 'image/jpg',
            });

            try {
                const response = await axios.post(`${ML_URL}/upload_image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(response.data.emotion);
                setScore((response.data.emotion === 'Sad') ? 14 : (response.data.emotion === 'Angry') ? 28 : (response.data.emotion === "Disgust") ? 42 : (response.data.emotion === 'Fear') ? 56 : (response.data.emotion === 'Neutral') ? 70 : (response.data.emotion === 'Surprise') ? 84 : 98);
                // console.log(photo.uri);
                // console.log(photo.base64);
                // Handle the API response here
            } catch (error) {
                console.error('Error uploading image:', error);
            }
            setButtonDisabled(false);
            setSpinning(false);


        };

        return (
            <SafeAreaView style={style.container}>
                <Spinner
                    visible={spinning}
                    textContent={'Loading...'}
                    textStyle={{ color: '#ffffff5f' }}
                />
                <Image style={style.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <Pressable style={style.button}
                    android_ripple={{ color: '#115351', borderless: false }}
                    onPress={uploadImage}
                    disabled={buttonDisabled}
                >
                    <Text>Upload Photo</Text>
                </Pressable>
            </SafeAreaView>
        )
    }

    return (
        <Camera
            ref={cameraRef}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}
            type={type}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                }}
            >
                <Pressable
                    style={{
                        flex: 0.1,
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                    }}
                    onPress={takePicture}
                >
                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Take Photo</Text>
                </Pressable>
            </View>
        </Camera>
    );
};

export default CameraComponent;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1,
        // height: '100%',
        // width: '100%',
        // borderWidth: 2
    },
    button: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#35a29f',
        margin: 10
    }
})
