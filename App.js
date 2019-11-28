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

const fetchFonts = () => Font.loadAsync({
  Roboto: require('native-base/Fonts/Roboto.ttf'),
  Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  ...Ionicons.font,
});

export default function App() {
  const [guessRounds, setGuessRounds] = useState(0);
  const [userNumber, setUserNumber] = useState();
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setIsReady(true)}
      onError={(err) => console.log(err)}
    />;
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }

  // Content condition
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
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

const styles = StyleSheet.create({
});
