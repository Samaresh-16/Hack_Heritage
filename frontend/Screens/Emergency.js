import { StyleSheet, Text, View, Image, Linking, Pressable } from 'react-native'
import React from 'react'
import GlobalStyle from '../style/style'
import { PHONE_NUMBER } from '../config'


const Emergency = () => {
    return (
        <View style={[GlobalStyle.container, styles.container]}>
            <Image source={require("../assets/logoShort.png")} style={styles.logo} />
            <Text style={[GlobalStyle.text, styles.heading]}>Emergency Situation?</Text>
            <Text style={[GlobalStyle.text, styles.text]}> call government helpline number : iCall</Text>
            <Pressable
                android_ripple={{ color: '#115351', borderless: true }}
                onPress={() => { Linking.openURL(`tel:${PHONE_NUMBER}`) }} style={styles.callbutton} >
                <Image source={require('../assets/call_icon.png')} style={styles.icon} />
            </Pressable>
        </View>
    )
}

export default Emergency

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#061953'
    },
    logo: {
        resizeMode: 'contain',
        height: 80,
        marginBottom: 20,
    },
    heading: {
        fontSize: 25,
    },
    text: {
        fontWeight: 100,
    },
    callbutton: {
        backgroundColor: '#35a29f',
        borderRadius: 50,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1,
        overflow: 'hidden',
        marginTop: 30
    },
    icon: {
        resizeMode: 'contain',
        height: 50
    }
})