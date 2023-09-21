import { StyleSheet, Text, View, Image, TextInput, Pressable, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import validator from 'validator'



const Login = () => {

    const { login } = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = () => {
        if (userName === '') {
            ToastAndroid.show("please enter your email", ToastAndroid.SHORT);
            return;
        }
        if (!validator.isEmail(userName)) {
            ToastAndroid.show("enter a valid email", ToastAndroid.SHORT);
            return;
        }
        if (password === '') {
            ToastAndroid.show('Please Enter Password', ToastAndroid.SHORT);
            return;
        }
        else {

            //todo : ADD BACKEND INTEGRATION   

            if (userName === 'sinha.vishul244@gmail.com' && password === 'hello')
                login();
            else {
                ToastAndroid.show('wrong username or password !', ToastAndroid.SHORT);
            }
        }
    }

    useEffect(() => {
        // console.log(userName)
    }, [userName])

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
            </View>
        </View>
    )
}

export default Login

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
    }
})