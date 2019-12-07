import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from 'react-native';
import { Card, Text, Button, View, H1, } from 'native-base';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <H1>The Game is over!</H1>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/img/success.png')} style={styles.image} />
            </View>
            <Text>Your phone needed {props.roundsNumber} rounds to guess the number {props.userNumber}.</Text>
            <Button style={styles.btn} onPress={props.onRestart}>
                <Text>Restart game</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center',
    },
    imageContainer: {
        width: '80%',
        height: 300,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
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