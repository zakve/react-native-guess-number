import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, View } from 'native-base';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

export default class GameScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentGuess: generateRandomBetween(1, 100, props.userChoice),
            currentLow: 0,
            currentHigh: 100
        }
    }

    nextGuessHandler = direction => {
        if ((direction === 'lower' && this.state.currentGuess < this.props.userChoice) || (direction === 'greater') && this.state.currentGuess > this.props.userChoice) {
            Alert.alert('Don\'t cheat!', 'You know that this is wrong...', [{ text: 'Sorry!' }]);
            return;
        }
        if (direction === 'lower') {
            this.setState({ currentHigh: this.state.currentGuess });
            this.state.currentGuess = generateRandomBetween(this.state.currentLow, this.state.currentHigh, this.state.currentGuess);
        } else {
            this.setState({ currentLow: this.state.currentGuess });
            this.state.currentGuess = generateRandomBetween(this.state.currentLow, this.state.currentHigh, this.state.currentGuess);
        }
    }

    render() {
        return (
            <Card style={styles.screen}>
                <Text>Opponent's Guess: {this.state.currentGuess}</Text>
                <View style={styles.buttonContainer}>
                    <Button onPress={this.nextGuessHandler.bind(this, 'lower')}>
                        <Text>Lower</Text>
                    </Button>
                    <Button onPress={this.nextGuessHandler.bind(this, 'greater')}>
                        <Text>Greater</Text>
                    </Button>
                </View>
            </Card>

        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
        height: 200,
        width: '90%'

    }
})
