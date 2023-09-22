import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL, AUTH_URL } from "../config";
import { ToastAndroid } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);


    const getPost = async (manualRefresh) => {
        if (!manualRefresh) setIsLoading(true);
        const userToken2 = await AsyncStorage.getItem('userToken');
        setUserToken(userToken2);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${BASE_URL}/apis/posts`,
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data.list);
                setPosts(response.data.list);
            })
            .catch((error) => {
                console.log("get posts error " + error);
            });


        if (!manualRefresh) setIsLoading(false);
    }

    const getCurrentUser = async () => {
        if (userToken === null) return;
        setIsLoading(true);
        const userToken2 = await AsyncStorage.getItem('userToken');
        setUserToken(userToken2);

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${BASE_URL}/${AUTH_URL}/current_user`,
            headers: {
                'Authorization': `Bearer ${userToken2}`
            },
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch((error) => {
                console.log("get user info error " + error);
            });
        setIsLoading(false);
    }




    const register = async (name, username, password, gender) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`http://${BASE_URL}/${AUTH_URL}/register`, {
                userFullName: name,
                userEmail: username,
                userPassword: password,
                userGender: gender
            }, {
                "Content-Type": "application/json",
            });
            if (res.data.success) {
                ToastAndroid.show(`User Registered Successful`, ToastAndroid.SHORT);
            }
            setUserToken(res.data.token);
            await AsyncStorage.setItem('userToken', `${res.data.token}`);
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                ToastAndroid.show(`Network Error`, ToastAndroid.SHORT);
            }
            if (error.response) {
                // console.log(error.response);
                ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
            }
        }

        setIsLoading(false);
    }

    const login = async (username, password) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`http://${BASE_URL}/${AUTH_URL}/login`, {
                username: username,
                password: password
            }, {
                "Content-Type": "application/json",
                // Authorization: ,
            });
            console.log(res.data.token);
            setUserToken(res.data.token);
            // console.log("login fn userToken value: " + userToken);
            await AsyncStorage.setItem('userToken', `${res.data.token}`);
        } catch (error) {
            console.log(Object.keys(error), error.code);
            if (error.code === 'ERR_NETWORK') {
                ToastAndroid.show(`Network Error`, ToastAndroid.SHORT);
            }
            if (error.response) {
                // console.log(error.response);
                ToastAndroid.show(`${error.response.data.message}`, ToastAndroid.SHORT);
            }
        }
        setIsLoading(false);
    }

    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        await AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setIsLoading(false);
        } catch (error) {
            console.log("is logged in error " + error);
        }
    }

    useEffect(() => {
        isLoggedIn();
        // console.log(userToken);
        getPost(false);
    }, [userToken, user])

    useEffect(() => {
        getCurrentUser();
    }, [userToken])


    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, register, getCurrentUser, user, posts, getPost }}>
            {children}
        </AuthContext.Provider>
    )
}