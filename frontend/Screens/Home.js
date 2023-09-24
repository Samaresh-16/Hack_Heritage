import { Text, View, StyleSheet, Pressable, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import GlobalStyle from '../style/style'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StepsToTake from './StepsToTake';
import TalkToExpert from './TalkToExpert';
import ScoringStack from '../navigations/ScoringStack';

const Stack = createStackNavigator();

const HomeStack = () => {

    const { score } = useContext(AuthContext);

    if (score === -1) return (
        <ScoringStack />
    )

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{
                header: () => null
            }}>
                <Stack.Screen name='home' component={Home} />
                <Stack.Screen name='steps' component={StepsToTake} />
                <Stack.Screen name='expert' component={TalkToExpert} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Home = ({ navigation }) => {
    const { logout, user, score } = useContext(AuthContext);
    // getCurrentUser();


    return (
        <View style={[GlobalStyle.container, style.container]}>
            {/* header */}
            <View style={style.header}>
                <View style={style.headerleft}>
                    <Image source={require('../assets/ci_hamburger-md.png')} style={style.headericon} />
                    <Image source={require('../assets/logoShort.png')} style={style.headericon} />
                </View>
                <View style={style.headerright}>
                    <Image source={require('../assets/jurica-koletic-7YVZYZeITc8-unsplash.jpg')} style={style.propic} />
                </View>
            </View>
            <View style={style.body}>
                <ScrollView style={style.scrollview} contentContainerStyle={{ flexGrow: 1, alignItems: 'center', gap: 20, borderWidth: 0, borderColor: '#f00', height: '100%' }}>
                    {/* <Text style={[style.title, GlobalStyle.text]}>Home</Text> */}
                    <Text style={GlobalStyle.text}>{user.userFullName}</Text>
                    <View style={[style.card, { alignItems: 'center', justifyContent: 'center' }]} >
                        <Image source={require('../assets/scoreBg.png')} style={style.cardImg} />
                        <View style={style.scorecard}>
                            <View style={style.scoreAndEmoji}>
                                <View style={style.scoreText}>
                                    <Text style={style.subheading}>{(score === -1) ? 'Help us understand you better' : 'Your score is'}</Text>
                                    <Text style={[style.scoreHeading, { color: (score > 91) ? '#68D60D' : (score > 75) ? '#EDCB23' : (score > 59) ? '#ff6b6c' : '#D70419', }]}>{(score === -1) ? 'Take test' : `${score}%`}</Text>
                                </View>
                                {(score > 84) ? <Image source={require('../assets/happy.png')} style={style.emoji} /> : (score >= 70) ? <Image source={require('../assets/moderateHappy.png')} style={style.emoji} /> : (score > 28) ? <Image source={require("../assets/moderateSad.png")} style={style.emoji} /> : (score !== -1) ? <Image source={require("../assets/sad.png")} style={style.emoji} /> : <Text></Text>}
                            </View>
                        </View>
                    </View>
                    <View style={style.card}>
                        <Pressable onPress={() => { navigation.navigate('steps') }}>
                            <Image source={require('../assets/steps.png')} style={style.cardImg} />
                        </Pressable>
                    </View>
                    <View style={style.card}>
                        <Pressable onPress={() => { navigation.navigate('expert') }}>
                            <Image source={require('../assets/talkToExpert.png')} style={style.cardImg} />
                        </Pressable>
                    </View>
                    <Pressable
                        android_ripple={{ color: '#115351', borderless: false }}
                        style={style.button}
                        onPress={() => { logout(); }}
                    >
                        <Text style={style.buttonText}>Logout</Text>
                    </Pressable>
                </ScrollView>
            </View>
        </View >
    )

}

export default HomeStack

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flex: .3,
        flexDirection: 'row',
        marginTop: 20,
        // borderWidth: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    scorecard: {
        zIndex: 100,
        position: 'absolute',
        width: '100%',

    },
    propic: {
        // resizeMode: 'center',
        height: '100%',
        aspectRatio: 1,
        // width: '100%',
        alignSelf: 'center',
    },
    card: {
        // borderWidth: 1,
        height: "25%",
        width: '90%',
        borderRadius: 16,
        overflow: 'hidden',
        // alignContent: 'center',
    },
    cardImg: {
        resizeMode: 'cover',
        height: '100%',
        width: "100%",
    },
    headerleft: {
        // borderWidth: 10,
        height: '100%',
        flex: 0.2,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',

    },
    headerright: {
        overflow: 'hidden',
        height: '45%',
        aspectRatio: 1,
        borderRadius: 100,
        // borderWidth: 2,

    },
    body: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
        // borderWidth: 2,
        width: '100%',
        height: "100%",
    },
    scrollview: {
        flex: 2,
        width: '100%',
        borderColor: '#Ff0',
        // borderWidth: 2,
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
    },
    headericon: {
        resizeMode: 'contain',
        width: 40
    },
    scoreAndEmoji: {
        flexDirection: 'row',
        width: "100%",
        // borderWidth: 2,
        justifyContent: 'space-between',
        padding: 7
    },
    emoji: {
        resizeMode: "contain",
        height: 80,
    },
    subheading: {
        color: '#ffffff7f',
        fontSize: 20
    },
    scoreHeading: {

        fontSize: 40
    },
    scoreText: {
        marginLeft: 20
    }
})