import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FileUpload from '../Screens/FileUpload';
import Questions from '../Screens/Questions';


const Stack = createStackNavigator();

const ScoringStack = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                header: () => null
            }}>
                <Stack.Screen name='facedetection' component={FileUpload} />
                <Stack.Screen name='questions' component={Questions} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ScoringStack

const styles = StyleSheet.create({})