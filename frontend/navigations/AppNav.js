import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import AuthStack from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import Home from './Home';

const AppNav = () => {

    const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#061953'

            }}>
                <ActivityIndicator size={'large'} color={'#f2f8a1'} />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {(userToken === null) ? < AuthStack /> : <Home />}
        </NavigationContainer>
    )
}

export default AppNav