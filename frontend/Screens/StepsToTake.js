import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StepsToTake = ({ navigator }) => {
    return (
        <View style={styles.container}>
            <Text>StepsToTake</Text>
        </View>
    )
}

export default StepsToTake

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})