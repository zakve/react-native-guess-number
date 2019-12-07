import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, View } from 'native-base';
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
    };

    return (
        <Card style={styles.screen}>
            <Text>Opponent's Guess: {currentGuess}</Text>
            <View style={styles.buttonContainer}>
                <Button onPress={nextGuessHandler.bind(this, 'lower')}>
                    <MaterialCommunityIcons name="arrow-down-bold" size={24} color="white" style={styles.icon} />
                    <Text>Lower</Text>
                </Button>
                <Button onPress={nextGuessHandler.bind(this, 'greater')}>
                    <MaterialCommunityIcons name="arrow-up-bold" size={24} color="white" style={styles.icon} />
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
    },
    icon: {
        marginHorizontal: 10
    }
})

export default GameScreen;