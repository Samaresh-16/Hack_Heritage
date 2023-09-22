import { StyleSheet, Text, View, Image, ScrollView, RefreshControl, TextInput, Pressable, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import GlobalStyle from '../style/style'
import { AuthContext } from '../context/AuthContext'
import Post from '../components/post'
import CheckBox from 'expo-checkbox';
import axios from 'axios'
import { BASE_URL } from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Community = () => {

    const { posts, getPost, user } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [postText, setPostText] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);



    const postSubmitHandler = async () => {
        setButtonDisabled(true);

        if (postText === '') {
            ToastAndroid.show("Please enter valid text", ToastAndroid.SHORT);
            setButtonDisabled(false);
            return;
        }
        try {
            // console.log(user);
            const userToken2 = await AsyncStorage.getItem('userToken');
            await axios.post(`http://${BASE_URL}/apis/create_post/user_id/${user.userId}`, {
                "postContent": postText,
                "isAnoynomous": toggleCheckBox
            }, {
                headers: {
                    'Authorization': `Bearer ${userToken2}`
                }
            })
            ToastAndroid.show("post added successfully", ToastAndroid.SHORT);
            getPost(true);
        } catch (error) {
            console.log(error);
        }

        setPostText('');

        setButtonDisabled(false);
        setToggleCheckBox(false);

    }

    return (
        <View style={[GlobalStyle.container, styles.container]}>
            <View style={styles.header}>
                <View style={styles.headerleft}>
                    <Image source={require('../assets/ci_hamburger-md.png')} style={styles.headericon} />
                    <Image source={require('../assets/logoShort.png')} style={styles.headericon} />
                </View>
                <View style={styles.headerright}>
                    <Image source={require('../assets/jurica-koletic-7YVZYZeITc8-unsplash.jpg')} style={styles.propic} />
                </View>
            </View>
            <ScrollView style={styles.scroll} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { getPost(true) }} />}>
                {posts.map((item) => (<Post key={item.postId} username={item.postUser.userFullName.split(' ')[0]} content={item.postContent} isAnonymous={item.isAnoynomous} />))}
            </ScrollView>
            <View style={styles.addpost}>

                <View style={styles.postinput}>
                    <TextInput multiline placeholder='hey champ? how are you feeling ? ' value={postText} style={styles.input} onChangeText={(value) => {
                        setPostText(value);
                        // console.log(postText);
                    }} />
                    <Pressable
                        style={
                            styles.button
                        }
                        android_ripple={{ color: '#115351', borderless: false }}
                        onPress={postSubmitHandler}
                        disabled={buttonDisabled}
                    >
                        <Image source={require('../assets/rightArrow.png')} style={{
                            resizeMode: 'contain',
                            height: 30
                        }} />
                    </Pressable>
                </View>
                <View style={styles.postAnonymously}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                    <Text style={{
                        color: '#ffffff7f',
                        marginLeft: 10
                    }}>Post anonymously</Text>
                </View>


            </View>
        </View>
    )
}

export default Community

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        resizeMode: 'contain',
        height: 80,
        marginBottom: 20,
    },
    heading: {
        fontSize: 25,
    },
    text: {
        fontWeight: 100,
    },
    scroll: {
        // borderWidth: 1,
        height: "10%",
        width: '100%'
    },
    header: {
        flex: .2,
        flexDirection: 'row',
        marginTop: 20,
        // borderWidth: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    propic: {
        // resizeMode: 'center',
        height: '100%',
        aspectRatio: 1,
        // width: '100%',
        alignSelf: 'center',
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
        height: '30%',
        aspectRatio: 1,
        borderRadius: 100,
        // borderWidth: 2,

    },
    headericon: {
        resizeMode: 'contain',
        width: 40
    },
    addpost: {
        paddingTop: 20,
        paddingBottom: 20
    },
    postAnonymously: {
        // flex: 1,
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    postinput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    input: {
        backgroundColor: "#ffffff4f",
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        width: '80%',
        height: 60
    },
    button: {
        backgroundColor: '#35a29f',
        alignItems: 'center',
        justifyContent: 'center',
        width: '15%',
        height: 60,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8
    }
})