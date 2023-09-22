import { Text, View, StyleSheet, Pressable, Image } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../Screens/Home';
import Community from '../Screens/Community';
import Emergency from '../Screens/Emergency';


const Tab = createBottomTabNavigator();

const Home = () => {

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator screenOptions={{
                header: () => null,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#061953',
                    height: '8%',
                    borderWidth: 0,
                    borderTopWidth: 0,
                    paddingBottom: 10
                },
                tabBarIconStyle: {
                    height: 10,
                }
            }}>
                <Tab.Screen name='home' component={Main} options={{
                    tabBarIcon: () => (<Image source={require('../assets/iconoir_home.png')} style={style.icon} ></Image>)
                }} />
                <Tab.Screen name='emergency' component={Emergency} options={{
                    tabBarIcon: () => (<Image source={require('../assets/icon-emergency.png')} style={[style.icon, { height: 60 }]} ></Image>)
                }} />

                <Tab.Screen name='community' component={Community} options={{
                    tabBarIcon: () => (<Image source={require('../assets/iconoir_community.png')} style={style.icon}></Image>),
                }} />
            </Tab.Navigator>
        </NavigationContainer >
    )

}

export default Home

const style = StyleSheet.create({
    icon: {
        resizeMode: 'contain',
        height: 25,
    }
})