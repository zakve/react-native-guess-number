import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, View } from 'native-base';

export default class GameOverScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text>The Game is over!</Text>
        )
    }
}