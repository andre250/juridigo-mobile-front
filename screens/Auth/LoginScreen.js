import React, { Component } from "react";
import {
  AsyncStorage,
  Button,
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import { StyleSheet } from 'react-native';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    state = {
      us: '',
      ps: ''
    }
  }
  
  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput style = {styles.input} 
                      autoCapitalize="none" 
                      onSubmitEditing={() => this.passwordInput.focus()} 
                      onChangeText={ TextInputValue =>
                        this.setState({us: TextInputValue }) }
                      autoCorrect={false} 
                      keyboardType='email-address' 
                      returnKeyType="next" 
                      placeholder='Email ou usuário' 
                      placeholderTextColor='rgba(225,225,225,0.7)'/>

        <TextInput style = {styles.input}   
                      returnKeyType="go" 
                      onChangeText={ TextInputValue =>
                        this.setState({ps: TextInputValue }) }
                      placeholder='Senha' 
                      placeholderTextColor='rgba(225,225,225,0.7)' 
                      secureTextEntry/>

        <TouchableOpacity style={styles.buttonContainer} 
                            onPress={this._logInAsync}>
                    <Text  style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} 
                            onPress={this._facebookLogInAsync}>
                    <Text  style={styles.buttonText}>FACEBOOK</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _facebookLogInAsync = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Expo.Facebook.logInWithReadPermissionsAsync('225963994956460', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        await AsyncStorage.setItem('userToken', token);
        this.props.navigation.navigate('App');
        // console.log(`Response ${(await JSON.stringify(response))}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  

  _logInAsync = async () => {
    await AsyncStorage.setItem('userToken', this.state.us+this.state.ps);
    //console.log(this.state.us)
    //console.log(this.state.ps)
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center'
   },
   input:{
       height: 40,
       backgroundColor: 'rgba(225,225,225,0.2)',
       marginBottom: 10,
       padding: 10,
       color: '#fff'
   },
   buttonContainer:{
       backgroundColor: '#2980b6',
       paddingVertical: 15,
       marginBottom: 10,
   },
   buttonText:{
       color: '#fff',
       textAlign: 'center',
       fontWeight: '700'
   }
});