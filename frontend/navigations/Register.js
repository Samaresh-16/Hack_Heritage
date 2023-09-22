import { Text, View, StyleSheet, Pressable, Image } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../Screens/Home';
import Community from '../Screens/Community';
import Emergency from '../Screens/Emergency';

const Register = () => {
    return (
        <View>
            <Text>Register</Text>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({})