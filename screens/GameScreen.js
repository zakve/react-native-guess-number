import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Alert, ScrollView } from 'react-native';
import { Card, Text, Button, View, List, ListItem } from 'native-base';
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
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const { userChoice, onGameOver } = props;

    // game over chceck
    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length);
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
            currentLow.current = currentGuess + 1;
        }

        // generate next number
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
    };

    return (
        <>
            <Card style={styles.card}>
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
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    <List>
                        {pastGuesses.map((guess, index) => <ListItem key={index} style={styles.listContent}><Text>#{index + 1}</Text><Text>{guess}</Text></ListItem>)}
                    </List>
                </ScrollView>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 120,
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        //width: '80%',
    },
    list: {
        //alignItems: 'center'
    },
    listContent: {
        justifyContent: 'space-between'
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