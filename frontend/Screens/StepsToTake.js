import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Step from '../components/Step'
import { AuthContext } from '../context/AuthContext'

const StepsToTake = ({ navigator }) => {

    const { steps, score } = useContext(AuthContext);

    useEffect(() => {
        console.log("Score is " + score);
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ height: 70 }}>

            </View>
            <Text style={styles.heading}>Steps To Take</Text>
            {/* <Image source={{ uri: 'https://www.naveenhospital.com/wp-content/uploads/2023/05/New-Project.png' }} style={{
                height: 220, width: '100%'
            }} /> */}
            <ScrollView style={styles.scroll}>
                {steps.filter((item) => { return (item.minScore <= score && item.maxScore >= score) }).map((item) => { return <Step title={item.title} url={item.link} key={item.id} /> })}
            </ScrollView>
        </View>
    )
}

export default StepsToTake

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#061953',
    },
    heading: {
        width: '100%',
        alignItems: "center",
        textAlign: "center",
        fontSize: 40,
        color: '#fff',
        marginBottom: 20
    },
    scroll: {
        flex: 0.8,
        width: '100%',
    }
})