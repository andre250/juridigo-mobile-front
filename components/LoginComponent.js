import React, { Component } from "react";
import {
  AsyncStorage,
  Button,
  View,
} from 'react-native';

export class LoginComponent extends Component {  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Login" onPress={this._signInAsync} />
        </View>
      );
    }
  
    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('Main');
    };
  }

export default LoginComponent;