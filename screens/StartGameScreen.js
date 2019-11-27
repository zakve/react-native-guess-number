import React, { useState } from "react";
import { StyleSheet, Alert, Keyboard } from "react-native";
import { Text, View, H2, Card, CardItem, Button, Body, Item, Input } from 'native-base';

// Components

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [selectedNumber, setSelectedNumber] = useState(0);
    const [confirmed, setConfirmed] = useState(false);

    // Confirm btn
    const confirmInputHandler = props => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [{ text: 'Okay', style: 'destructive', onPress: resetInputHanderl }])
            return;
        };
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    // Reset btn
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    return (
        <View style={styles.screen}>
            <H2 style={styles.title}>Start a New Game!</H2>
            <Card style={{ ...styles.card, ...props.style }}>
                <CardItem header>
                    <Text>Select a number </Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Item floatingLabel>
                            <Input
                                style={styles.input}
                                autoFocus={true}
                                value={enteredValue}
                                onChangeText={(enteredValue) => setEnteredValue(enteredValue)}
                                keyboardType="number-pad"
                                maxLength={2} />
                        </Item>
                        <View style={styles.buttonContainer}>
                            <Button bordered danger style={styles.button} onPress={resetInputHandler}>
                                <Text>Reset</Text>
                            </Button>
                            <Button success style={styles.button} onPress={confirmInputHandler}>
                                <Text>Confirm</Text>
                            </Button>
                        </View>
                    </Body>
                </CardItem>
                {confirmed ?
                    <View>
                        <Text style={styles.choosenNumber}>Chosen Number: {selectedNumber}</Text>
                        <Button onPress={() => props.onStartGame(selectedNumber)}>
                            <Text>Start game</Text>
                        </Button>
                    </View>
                    : <View></View>}
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center',
    },
    title: {
        textAlign: "center",
        paddingBottom: 15
    },
    card: {
        width: '90%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
        paddingTop: 20
    },
    input: {
        textAlign: 'center'
    },
    choosenNumber: {
        textAlign: 'center',
        fontSize: 20,
        paddingVertical: 10
    }
})

export default StartGameScreen;