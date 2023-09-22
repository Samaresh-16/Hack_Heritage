import { StyleSheet, Text, View, Image, TextInput, Pressable, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { AuthContext } from '../context/AuthContext'
import validator from 'validator'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GlobalStyle from '../style/style'

const Stack = createStackNavigator();

const Authentication = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={
                {
                    header: () => null
                }
            }>
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Register = ({ navigation }) => {
    const { register } = useContext(AuthContext);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');



    const registerHandler = () => {
        if (name === '') {
            ToastAndroid.show("Please enter your name", ToastAndroid.SHORT);
            return;
        }
        if (username === '') {
            ToastAndroid.show("Please enter your email", ToastAndroid.SHORT);
            return;
        }
        if (!validator.isEmail(username)) {
            ToastAndroid.show("enter a valid email !", ToastAndroid.SHORT);
            return;
        }
        if (password === '') {
            ToastAndroid.show("Please enter your password", ToastAndroid.SHORT);
            return;
        }
        if (gender === '') {
            ToastAndroid.show("Please provide your gender", ToastAndroid.SHORT);
            return;
        }
        register(name, username, password, gender);

    }

    const switchLogin = () => {
        navigation.replace("login");
    }



    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/umeedLogo.png')} alt='name' />

            <View style={styles.formContainer}>
                <TextInput
                    style={[styles.input]}
                    placeholder='name'
                    placeholderTextColor={'#ffffff7f'}
                    onChangeText={(value) => {
                        setName(value);
                    }}
                />
                <TextInput
                    style={[styles.input]}
                    placeholder='email'
                    placeholderTextColor={'#ffffff7f'}
                    onChangeText={(value) => {
                        setUserName(value);
                    }}
                />
                <TextInput
                    secureTextEntry={true} style={styles.input}
                    placeholder='password'
                    placeholderTextColor={'#ffffff7f'}
                    onChangeText={(value) => {
                        setPassword(value);
                    }}
                />
                <View style={{ borderRadius: 8, overflow: 'hidden', alignContent: 'center', justifyContent: 'center' }}>
                    <Picker selectedValue={gender} style={styles.input}
                        itemStyle={{
                            fontSize: 15,
                            height: 75,
                            color: 'black',
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }} placeholder='gender' onValueChange={(value) => { setGender(value) }}>
                        <Picker.Item label='select gender' value='' />
                        <Picker.Item label='male' value='male' />
                        <Picker.Item label='female' value='female' />
                        <Picker.Item label='others' value='others' />
                    </Picker>
                </View>
                <Pressable
                    android_ripple={{ color: '#115351', borderless: false }}
                    style={styles.button}
                    onPress={registerHandler}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>
                <Text style={[GlobalStyle.text, styles.newuser]}> already registered ? Login here</Text>
                <Pressable
                    android_ripple={{ color: '#115351', borderless: false }}
                    style={styles.button}
                    onPress={switchLogin}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            </View>
        </View>
    )
}


const Login = ({ navigation }) => {

    const { login } = useContext(AuthContext);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = () => {
        if (username === '') {
            ToastAndroid.show("please enter your email", ToastAndroid.SHORT);
            return;
        }
        if (!validator.isEmail(username)) {
            ToastAndroid.show("enter a valid email", ToastAndroid.SHORT);
            return;
        }
        if (password === '') {
            ToastAndroid.show('Please Enter Password', ToastAndroid.SHORT);
            return;
        }
        else {
            login(username, password);
        }
    }

    const switchRegister = () => {
        navigation.replace('register');
    }

    useEffect(() => {
        // console.log(userName)
    }, [username])

    return (

        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/umeedLogo.png')} alt='name' />
            <View style={styles.formContainer}>
                <TextInput
                    style={[styles.input]}
                    placeholder='username'
                    placeholderTextColor={'#ffffff7f'}
                    onChangeText={(value) => {
                        setUserName(value);
                    }}
                />
                <TextInput
                    secureTextEntry={true} style={styles.input}
                    placeholder='password'
                    placeholderTextColor={'#ffffff7f'}
                    onChangeText={(value) => {
                        setPassword(value);
                    }}
                />
                <Pressable
                    android_ripple={{ color: '#115351', borderless: false }}
                    style={styles.button}
                    onPress={loginHandler}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Text style={[GlobalStyle.text, styles.newuser]}> new user ? Register here</Text>
                <Pressable
                    android_ripple={{ color: '#115351', borderless: false }}
                    style={styles.button}
                    onPress={switchRegister}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Authentication

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#061953',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        resizeMode: 'contain',
        height: 75,
        marginBottom: 10
    },
    input: {
        backgroundColor: '#ffffff2f',
        width: '100%',
        height: 40,
        textAlign: 'center',
        color: '#fff',
        borderRadius: 8
    },
    formContainer: {
        width: '80%',
        gap: 10,
    },
    button: {
        backgroundColor: '#35a29f',
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonText: {
        color: '#fff',
    },
    newuser: {
        alignSelf: 'center',
        fontWeight: '300'
    }
})