import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Card, Text, Button, View, H1, } from 'native-base';

const GameOverScreen = props => {
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get("window").height)

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.addEventListener("change", updateLayout)
        }
    })
    return (
        <ScrollView>
            <View style={styles.screen}>
                <H1>The Game is over!</H1>
                <View style={{
                    ...styles.imageContainer, ...{
                        width: availableDeviceWidth * 0.7,
                        height: availableDeviceWidth * 0.7,
                        borderRadius: (availableDeviceWidth * 0.7) / 2,
                        marginVertical: availableDeviceHeight / 30,
                    }
                }}>
                    <Image source={require('../assets/img/success.png')} style={styles.image} />
                </View>
                <Text>Your phone needed {props.roundsNumber} rounds to guess the number {props.userNumber}.</Text>
                <Button style={styles.btn} onPress={props.onRestart}>
                    <Text>Restart game</Text>
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        //flex: 1,
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center',
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    btn: {
        marginVertical: 10
    }
})

export default GameOverScreen;