import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TalkToExpert = ({ navigator }) => {
    return (
        <View style={styles.container}>
            <Text>Talk to expert</Text>
        </View>
    )
}

export default TalkToExpert

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})