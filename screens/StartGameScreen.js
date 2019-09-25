import React from "react";
import { StyleSheet } from "react-native";
import { Container, Text, View } from 'native-base';

// Components
import Card from "../components/Card";

export default class StartGameScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>Start a New Game!</Text>
                <Card />
            </View>
        );
    }
}