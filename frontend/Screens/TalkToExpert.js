import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GlobalStyle from '../style/style'

const TalkToExpert = ({ navigator }) => {
    return (
        <View style={[GlobalStyle.container, styles.container]}>
            <Text style={[GlobalStyle.text]}>Talk to expert</Text>
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