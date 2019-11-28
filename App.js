import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

// UI native-base
import { Container, Text, Button } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

// Components
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Header from "./components/Header";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      userNumber: 0,
      guessRounds: 0
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  configureNewGameHandler = () => {
    this.setState({ guessRounds: 0 })
    this.setState({ userNumber: null });
  }

  startGameHandler = (selectedNumber) => {
    this.setState({ userNumber: selectedNumber });
  }

  gameOverHandler = numOfRounds => {
    this.setState({ guessRounds: numOfRounds })
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    let content = <StartGameScreen onStartGame={this.startGameHandler} />;

    if (this.state.userNumber && this.state.guessRounds <= 0) {
      content = <GameScreen userChoice={this.state.userNumber} onGameOver={this.gameOverHandler} />;
    } else if (this.state.guessRounds > 0) {
      content = <GameOverScreen roundsNumber={this.state.guessRounds} userNumber={this.state.userNumber} onRestart={this.configureNewGameHandler} />
    }

    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <Container>
          <Header title="Guess number" />
          {content}
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
});
