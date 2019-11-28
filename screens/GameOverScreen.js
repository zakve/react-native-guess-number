import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, View } from 'native-base';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Game is over!</Text>
            <Text>Number of rounds: {props.roundsNumber}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button onPress={props.onRestart}>
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
    }
})

export default GameOverScreen;