import React from "react";
import { StyleSheet } from "react-native";
import { Container, Text, View, H2 } from 'native-base';

// Components
import Card from "../components/Card";

export default class StartGameScreen extends React.Component {
    render() {
        return (
            <View style={styles.screen}>
                <H2 style={styles.title}>Start a New Game!</H2>
                <Card />
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
    }
})