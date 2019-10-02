import React, { useState } from "react";
import { StyleSheet } from 'react-native';
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
            currentGuess: generateRandomBetween(1, 100, props.userChoice)
        }
    }

    render() {
        return (
            <Card style={styles.screen}>
                <Text>Opponent's Guess: {this.state.currentGuess}</Text>
                <View style={styles.buttonContainer}>
                    <Button>
                        <Text>Lower</Text>
                    </Button>
                    <Button>
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
