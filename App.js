import React from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

// UI native-base
import { Container, Text, Button } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

// Components
import StartGameScreen from "./screens/StartGameScreen";
import Header from "./components/Header";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
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

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <Container>
          <Header title="Guess number" />
          <StartGameScreen />
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
});
