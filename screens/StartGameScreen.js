import React from "react";
import { StyleSheet, Alert, Keyboard } from "react-native";
import { Text, View, H2, Card, CardItem, Button, Body, Item, Input } from 'native-base';

// Components

export default class StartGameScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            enteredValue: '',
            selectedNumber: 0,
            confirmed: false
        }
    }

    confirmInputHandler() {
        const chosenNumber = parseInt(this.state.enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99.', [{ text: 'Okay', style: 'destructive', onPress: this.resetInputHanderl }])
            return;
        };
        this.setState({ selectedNumber: chosenNumber });
        this.setState({ confirmed: true });
        this.setState({ enteredValue: '' });
        Keyboard.dismiss();
    }

    render() {
        return (
            <View style={styles.screen}>
                <H2 style={styles.title}>Start a New Game!</H2>
                <Card style={{ ...styles.card, ...this.props.style }}>
                    <CardItem header>
                        <Text>Select a number </Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Item floatingLabel>
                                <Input
                                    style={styles.input}
                                    autoFocus={true}
                                    value={this.state.enteredValue}
                                    onChangeText={(enteredValue) => this.setState({ enteredValue })}
                                    keyboardType="number-pad"
                                    maxLength={2} />
                            </Item>
                            <View style={styles.buttonContainer}>
                                <Button bordered danger style={styles.button} onPress={() => this.setState({ enteredValue: '' })}>
                                    <Text>Reset</Text>
                                </Button>
                                <Button success style={styles.button} onPress={() => { this.confirmInputHandler() }}>
                                    <Text>Confirm</Text>
                                </Button>
                            </View>
                        </Body>
                    </CardItem>
                    {this.state.confirmed ?
                        <View>
                            <Text style={styles.choosenNumber}>Chosen Number: {this.state.selectedNumber}</Text>
                            <Button onPress={() => this.props.onStartGame(this.state.selectedNumber)}>
                                <Text>Start game</Text>
                            </Button>
                        </View>
                        : <Text></Text>}
                </Card>
            </View>
        );
    }
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