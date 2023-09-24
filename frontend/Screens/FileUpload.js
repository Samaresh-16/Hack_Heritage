import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalStyles from '../style/style'
import * as ImagePicker from 'expo-image-picker'
import CameraComponent from '../components/CameraComponent'
import FormComponent from '../components/FormComponent'


const FileUpload = () => {
    return (
        <View style={[GlobalStyles.container, styles.container]}>
            <CameraComponent onPictureTaken={(photo) => {
                // Handle the photo taken by the camera if needed
            }} />
            {/* <FormComponent /> */}
        </View>
    )
}

export default FileUpload

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})