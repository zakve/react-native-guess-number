import React from "react";
import { StyleSheet, Alert } from 'react-native';
import { Card, CardItem, Text, Button, Body, Item, Input, View } from 'native-base';

export default class CardShow extends React.Component {
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
    }

    render() {
        return (
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
                {this.state.confirmed ? <Text style={styles.choosenNumber}>Chosen Number: {this.state.selectedNumber}</Text> : <Text></Text>}
            </Card>
        );
    }
}

const styles = StyleSheet.create({
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