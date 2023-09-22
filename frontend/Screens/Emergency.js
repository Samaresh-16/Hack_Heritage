import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import GlobalStyle from '../style/style'


const Emergency = () => {
    return (
        <View style={[GlobalStyle.container, styles.container]}>
            <Image source={require("../assets/logoShort.png")} style={styles.logo} />
            <Text style={[GlobalStyle.text, styles.heading]}>Emergency</Text>
            <Text style={[GlobalStyle.text, styles.text]}>coming soon</Text>
        </View>
    )
}

export default Emergency

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
    }
})