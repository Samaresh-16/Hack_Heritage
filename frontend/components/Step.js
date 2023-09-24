import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Step = ({ url, title }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.text}>{title}</Text>
            <Image source={{ uri: url }} style={styles.image} />
        </View>
    )
}

export default Step

const styles = StyleSheet.create({
    card: {
        height: 200,
        width: "90%",
        borderRadius: 8,
        // borderWidth: 2,
        alignSelf: 'center',
        overflow: 'hidden',
        marginBottom: 20
    },
    image: {
        height: 220,
        width: "100%",
        resizeMode: 'cover',
        borderWidth: 8
    },
    text: {
        position: 'absolute',
        bottom: 0,
        zIndex: 100,
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
        width: '100%',
        backgroundColor: '#0000005f'
    }

})