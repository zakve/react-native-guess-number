import React, { useState, useRef, useEffect } from "react";
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

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [rounds, setRounds] = useState(0);
    const { userChoice, onGameOver } = props;

    // game over chceck
    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);

    // game logic
    const nextGuessHandler = direction => {
        // cheating validation
        console.log(`currentGuess: ${currentGuess}`);
        console.log(`props.userChoice: ${props.userChoice}`);
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert("Don't lie!", 'You know that this is wrong...', [
                { text: 'Sorry!', style: 'cancel' }
            ]);
            return;
        }

        // 
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        // generate next number
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);

        /* console.log(`direction: ${direction}`);
        console.log(`currentLow.current: ${currentLow.current}`);
        console.log(`currentHigh.current: ${currentHigh.current}`);
        console.log(`currentGuess: ${currentGuess}`); */
    };

    return (
        <Card style={styles.screen}>
            <Text>Opponent's Guess: {currentGuess}</Text>
            <View style={styles.buttonContainer}>
                <Button onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Text>Lower</Text>
                </Button>
                <Button onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Text>Greater</Text>
                </Button>
            </View>
        </Card>

    )
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

export default GameScreen;