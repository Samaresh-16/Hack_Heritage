import { StyleSheet, Text, View, Image, ScrollView, RefreshControl, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import GlobalStyle from '../style/style'
import { AuthContext } from '../context/AuthContext'
import Post from '../components/post'



const Community = () => {

    const { posts, getPost } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);

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

                <View><TextInput placeholder='hey champ? how are you feeling ? ' /></View>


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

    }
})