import { Text, View, StyleSheet, Pressable } from 'react-native'
import React, { Component, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Home = () => {

    const { logout } = useContext(AuthContext);

    return (
        <View style={style.container}>
            <Text style={style.title}>Home</Text>
            <Pressable
                android_ripple={{ color: '#115351', borderless: false }}
                style={style.button}
                onPress={() => { logout(); }}
            >
                <Text style={style.buttonText}>Logout</Text>
            </Pressable>
        </View>
    )

}

export default Home

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#000',
        fontSize: 20
    },
    button: {
        backgroundColor: '#35a29f',
        width: '80%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonText: {
        color: '#fff',
    }
})