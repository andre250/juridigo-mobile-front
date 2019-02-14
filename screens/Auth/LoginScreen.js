import React, { Component } from "react";
import {
  AsyncStorage,
  Button,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import User from '../../http_factory/user';
import sha256 from 'js-sha256';
import jwtDecode from 'jwt-decode';



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
        <TextInput style={styles.inputLogin}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={TextInputValue =>
            this.setState({ us: TextInputValue })}
          autoCorrect={false}
          keyboardType='default'
          returnKeyType="next"
          placeholder='usuario'
          placeholderTextColor='rgba(63,63,63,0.7)' />
        <TextInput style={styles.inputPass}
          returnKeyType="go"
          onChangeText={TextInputValue =>
            this.setState({ ps: TextInputValue })}
          placeholder='senha'
          placeholderTextColor='rgba(63,63,63,0.7)'
          secureTextEntry />

        <TouchableOpacity style={styles.buttonSignin}
          onPress={this._logInAsync}>
          { this.state.loading == true 
            ? <ActivityIndicator size="small" color="#FFFFFF" />
            : <Text style={styles.buttonSigninText}>ENTRAR</Text> }
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSignup}
          onPress={this._logInAsync}>
          <Text style={styles.buttonSignupText}>Ainda não possuo cadastro</Text>
        </TouchableOpacity>
        <Text style={styles.separatorText}>────────  ou  ────────</Text>
        <View style={styles.fbContainer}>
          <Image style={styles.fbImage} source={require('../../assets/images/fb_icon.png')} />
          <TouchableOpacity style={styles.buttonFacebook}
            onPress={this._facebookLogInAsync}>
            <Text style={styles.buttonFacebookText}>ENTRAR COM FACEBOOK</Text>
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
        console.log(`Response ${(await JSON.stringify(response))}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  _logInAsync = async () => {
    this.setState({ loading: true });

    if (!this.state.us) {
      this.setState({ loading: false });

      return Alert.alert(
        'Usuário não preenchido',
        'Por favor entre com o seu usuário.');
    }
    else if (!this.state.ps) {
      this.setState({ loading: false });
      
      return Alert.alert(
        'Senha não preenchida',
        'Por favor entre com a sua senha.');
    }

    try {
      const hash = sha256.create().update(this.state.us + "@" + this.state.ps).hex();
      const token = await User.login({ "credencial": hash });
      console.log(token)
      
      await AsyncStorage.setItem('userToken', token);
      
      const decoded = jwtDecode(token);
      
      await AsyncStorage.setItem('userName', decoded.name);
      await AsyncStorage.setItem('userID', decoded.id);
      
      this.setState({ loading: false });
      this.props.navigation.navigate('App');

    } catch (error) {
      this.setState({ loading: false });
      
      return Alert.alert(
        'Usuário ou senha inválido',
        'Por favor verifique e tente novamente.'
      );
    };
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
  inputLogin: {
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
  inputPass: {
    height: hp('6%'),
    width: wp('60%'),
    marginBottom: hp('5%'),
    marginLeft: hp('8%'),
    marginRight: hp('8%'),
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: hp('2%')
  },
  buttonSignin: {
    backgroundColor: '#2980b6',
    paddingVertical: hp('1%'),
    marginBottom: hp('5%'),
    marginLeft: hp('5%'),
    marginRight: hp('5%'),
    width: wp('35%'),
    height: hp('5%'),
  },
  buttonSigninText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  buttonSignup: {
    paddingVertical: hp('2%'),
    marginBottom: hp('5%'),
  },
  buttonSignupText: {
    textDecorationLine: 'underline',
    color: 'white',
    textAlign: 'center',
    fontWeight: '700'
  },
  separatorText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: hp('7%'),
    width: wp('100%'),
  },
  fbImage: {
    paddingVertical: hp('2%'),
    height: hp('10%'),
    width: wp('20%'),
  },
  fbContainer: {
    flexDirection: 'row'
  },
  buttonFacebook: {
    backgroundColor: '#3C579E',
    paddingVertical: hp('3,5%'),
    marginBottom: 10,
    height: hp('10%'),
    width: wp('60%'),
  },
  buttonFacebookText: {
    textDecorationLine: 'underline',
    color: 'white',
    textAlign: 'center',
    fontWeight: '700'
  }
});
