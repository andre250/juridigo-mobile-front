import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

const jwtDecode = require('jwt-decode');

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
<<<<<<< HEAD
    const decoded = jwtDecode(userToken);
    const timeNow = Math.round(new Date().getTime()/1000);

    if (userToken) {
      if (timeNow < decoded.exp) {
        return this.props.navigation.navigate('App');
      }
    }
    
    return this.props.navigation.navigate('Auth');
=======
    // const userToken = ""
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Auth' : 'RegisterForm');
>>>>>>> 3df368a0cde439b1ffb8569ce02474af757609b1
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});