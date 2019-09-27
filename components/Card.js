import React from "react";
import { StyleSheet } from 'react-native';
import { Card, CardItem, Text, Button, Body, Item, Input, View } from 'native-base';

export default class CardShow extends React.Component {
    render() {
        return (
            <Card style={{ ...styles.card, ...this.props.style }}>
                <CardItem header>
                    <Text>Select a number </Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Item floatingLabel>
                            <Input style={styles.input} keyboardType="number-pad" maxLength={2} />
                        </Item>
                        <View style={styles.buttonContainer}>
                            <Button bordered danger style={styles.button} onPress={() => { console.log("Reset!") }}>
                                <Text>Reset</Text>
                            </Button>
                            <Button success style={styles.button} onPress={() => { console.log("Confirm") }}>
                                <Text>Confirm</Text>
                            </Button>
                        </View>
                    </Body>
                </CardItem>
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
    }
})