import React, { Component } from "react";
import {
  AsyncStorage,
  Button,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});