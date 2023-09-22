import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const post = ({ username, content, isAnonymous }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.username}>{(isAnonymous !== 'true') ? username : 'Anonymous'}</Text>
            <Text style={styles.postcontent}>{content}</Text>
        </View>
    )
}

export default post

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff0f',
        marginBottom: 5,
        padding: 20,
        borderRadius: 8,
        margin: 10
    },
    username: {
        fontSize: 20,
        color: '#ffffffcf',
        marginBottom: 5,
    },
    postcontent: {
        color: '#ffffff8f'
    }
})