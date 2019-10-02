import React, { useState } from "react";
import { StyleSheet } from 'react-native';
import { View } from 'native-base';

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
            currentGuess: this.generateRandomBetween(1, 100, props.userChoice)
        }
    }
}
