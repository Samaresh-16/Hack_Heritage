import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const Questions = ({ navigation }) => {


    return (
        <View style={styles.container}>
            <Text>Questions</Text>
        </View>
    )
}

export default Questions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
})