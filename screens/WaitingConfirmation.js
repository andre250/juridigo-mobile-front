import React from "react";
import { View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Ionicons"
import { Platform } from 'react-native';

export default class WaitingConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      us: '',
      ps: ''
    }
  }

  static navigationOptions = {
    title: 'Aguardando aprovação',
  };

  render() {
    return (
    <ImageBackground source={require('../assets/images/bg3x.png')} style={styles.imageContainer}>
      <View style={styles.container}>
        <View  style={{
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 100,
                  height: 100,
                  backgroundColor: '#ecf0f1',
                  borderRadius: 100,
                }}>
            <Icon name={Platform.OS === "ios" ? "ios-search" : "md-search"} color="#9F9F9F" size={50} />
        </View>
        <Text style={styles.descriptionText}>
        O seu cadastro está sendo analisado pelos nossos especialistas.
        Você receberá um e-mail quando sua solicitação for aprovada.
        {"\n"}
        {"\n"}
        {"\n"}
        Ficamos felizes em tê-lo conosco.
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
        {"\n"}
        Equipe JuridiGo.
        </Text>
        <TouchableOpacity style={styles.buttonSignup}
        onPress={() => {this.props.navigation.navigate('Auth')}} >
            <Text style={styles.buttonSignupText}>Voltar para a tela de login</Text>
        </TouchableOpacity>
    </View>
    </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
   imageContainer: {
    padding: hp('5%'),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  container: {
    padding: hp('2%'),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttonSignup: {
    paddingVertical: hp('1.5%'),
    marginBottom: hp('5%'),
    marginTop: hp('5%'),
    height: hp('8%'),
    width: wp('40%'),
    backgroundColor: '#2980b6'
  },
  buttonSignupText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700'
  },
  descriptionText: {
    color: '#333333',
    textAlign: 'justify',
    fontWeight: '700',
    fontSize: hp('2%'),
    marginTop:hp('10%')
  }
});
