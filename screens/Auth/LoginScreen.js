import React, { Component } from "react";
import {
  AsyncStorage,
  Button,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image, 
  Alert
} from 'react-native';
import { Divider } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <Image style={styles.logoImage} source={require('../../assets/images/logo_final.png')} />
        <TextInput style = {styles.inputLogin} 
                      autoCapitalize="none" 
                      onSubmitEditing={() => this.passwordInput.focus()} 
                      onChangeText={ TextInputValue =>
                        this.setState({us: TextInputValue }) }
                      autoCorrect={false} 
                      keyboardType='email-address' 
                      returnKeyType="next" 
                      placeholder='email' 
                      placeholderTextColor='rgba(63,63,63,0.7)'/>

        <TextInput style = {styles.inputPass}   
                      returnKeyType="go" 
                      onChangeText={ TextInputValue =>
                        this.setState({ps: TextInputValue }) }
                      placeholder='senha' 
                      placeholderTextColor='rgba(63,63,63,0.7)' 
                      secureTextEntry/>

        <TouchableOpacity style={styles.buttonSignin} 
                            onPress={this._logInAsync}>
                    <Text  style={styles.buttonSigninText}>ENTRAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSignup} 
                            onPress={this._logInAsync}>
                    <Text  style={styles.buttonSignupText}>Ainda não possuo cadastro</Text>
        </TouchableOpacity>
        <Text  style={styles.separatorText}>────────  ou  ────────</Text>
        <View style={styles.fbContainer}>
          <Image style={styles.fbImage} source={require('../../assets/images/fb_icon.png')} />
          <TouchableOpacity style={styles.buttonFacebook} 
                              onPress={this._facebookLogInAsync}>
                      <Text  style={styles.buttonFacebookText}>ENTRAR COM FACEBOOK</Text>
          </TouchableOpacity>
        </View>
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
    if (!this.state.us) {
      Alert.alert(
        'Usuário não preenchido',
        'Por favor entre com o seu usuário.')
    }
    else if (!this.state.ps) {
        Alert.alert(
          'Senha não preenchida',
          'Por favor entre com a sua senha.')
      }
    else {
      let credentials = this.state.us + ':' + this.state.ps
      /* fetch('')
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ loading: false });
      }); */
      await AsyncStorage.setItem('userToken', credentials);
      this.props.navigation.navigate('App');
    }
  };
}

const styles = StyleSheet.create({
  container: {
       padding: hp('10%'),
       flex: 1,
       justifyContent: 'center',
       backgroundColor: 'black',
       alignItems: 'center'
   },
   logoImage: {
       height: hp('20%'),
       width: wp('95%'),
       marginLeft: hp('8%'),
       marginRight: hp('8%'),
       marginTop: hp('5%'),
   },
   inputLogin:{
    height: hp('6%'),
    width: wp('60%'),
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
    marginLeft: hp('8%'),
    marginRight: hp('8%'),
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: hp('2%')
  },
   inputPass:{
       height: hp('6%'),
       width: wp('60%'),
       marginBottom: hp('5%'),
       marginLeft: hp('8%'),
       marginRight: hp('8%'),
       backgroundColor: '#fff',
       textAlign: 'center',
       fontSize: hp('2%')
   },
   buttonSignin:{
       backgroundColor: '#2980b6',
       paddingVertical: hp('1%'),
       marginBottom: hp('5%'),
       marginLeft: hp('5%'),
       marginRight: hp('5%'),
       width: wp('35%'),
       height: hp('5%'),
   },
   buttonSigninText:{
       color: '#fff',
       textAlign: 'center',
       fontWeight: '700'
   },
   buttonSignup:{
       paddingVertical: hp('2%'),
       marginBottom: hp('5%'),
   },
   buttonSignupText:{
       textDecorationLine: 'underline',
       color: 'white',
       textAlign: 'center',
       fontWeight: '700'
   },
   separatorText:{
       color: 'white',
       textAlign: 'center',
       fontWeight: '700',
       marginBottom: hp('7%'),
       width: wp('100%'),
   },
   fbImage:{
       paddingVertical: hp('2%'),
       height: hp('10%'),
       width: wp('20%'),
   },
   fbContainer:{
    flexDirection: 'row'
   },
   buttonFacebook:{
       backgroundColor: '#3C579E',
       paddingVertical: hp('3,5%'),
       marginBottom: 10,
       height: hp('10%'),
       width: wp('60%'),
   },
   buttonFacebookText:{
       textDecorationLine: 'underline',
       color: 'white',
       textAlign: 'center',
       fontWeight: '700'
   }
});