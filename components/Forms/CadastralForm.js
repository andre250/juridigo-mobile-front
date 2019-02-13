import React from 'react';
import { TextInput, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ProgressBar} from '../ProgressBar'
import { Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"

class CadastralForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Progress_Value: 0.25
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.spaceAroundContainer}>
          <TextInput placeholder='Nome Completo' style={styles.input} />
          <TextInput placeholder='Email' style={styles.input} />
        </View>
        <View style={styles.spaceBetweenContainer}>
          <TextInput placeholder='Senha' style={[styles.input, styles.twoColumnsInput]} />
          <TextInput placeholder='Confirmar Senha' style={[styles.input, styles.twoColumnsInput]} />
        </View>
        <View style={styles.spaceBetweenContainer}>
          <TextInput placeholder='Celular' style={[styles.input, styles.twoColumnsInput]} />
          <TextInput placeholder='Telefone' style={[styles.input, styles.twoColumnsInput]} />
        </View>
        <View style={styles.flexStartContainer}>
          <TextInput placeholderTextColor={'#787974'} placeholder='Data Nascimento' style={[styles.input, styles.twoColumnsInput, styles.protectedInput]} />
          <Icon style={styles.cepLabel} name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"} color="#9F9F9F" size={hp('5%')} />
        </View>
        <View style={styles.spaceBetweenContainer}>
          <TextInput placeholder='CPF' style={[styles.input, styles.twoColumnsInput]} />
          <TextInput placeholder='RG' style={[styles.input, styles.twoColumnsInput]} />
        </View>
        <View style={styles.spaceBetweenContainer}>
          <TextInput placeholder='CEP' style={[styles.input, styles.fiftyFiveSizeInput]} />
          <Text style={styles.cepLabel}>Não sei o meu CEP</Text>
        </View>
        <View style={styles.spaceAroundContainer}>
          <TextInput placeholderTextColor={'#787974'} editable={false} selectTextOnFocus={false} placeholder='Endereço' style={[styles.input, styles.protectedInput]} />
        </View>
        <View style={styles.flexStartContainer}>
          <TextInput placeholder='N' style={[styles.input, styles.twentyFiveSizeInput]} />
          <TextInput placeholder='Complemento' style={[styles.input, styles.twoColumnsInput, styles.complementMargin]} />
        </View>
        <View style={styles.flexStartContainer}>
          <TextInput placeholderTextColor={'#787974'} editable={false} selectTextOnFocus={false} placeholder='Bairro' style={[styles.input, styles.sixtySizeInput, styles.protectedInput]} />
        </View>
        <View style={styles.spaceBetweenContainer}>
          <TextInput placeholderTextColor={'#787974'} editable={false} selectTextOnFocus={false} placeholder='Cidade' style={[styles.input, styles.eightySizeInput, styles.protectedInput]} />
          <TextInput placeholderTextColor={'#787974'} editable={false} selectTextOnFocus={false} placeholder='UF' style={[styles.input, styles.twentySizeInput, styles.protectedInput]} />
        </View>
        <TouchableOpacity style={styles.buttonSignin}>
          <Text style={styles.buttonSigninText}>PRÓXIMO</Text>
        </TouchableOpacity>
        <ProgressBar Progress_Value={this.state.Progress_Value}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E9ED',
    flex: 1,
  },
  spaceAroundContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%')
  },
  spaceBetweenContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%')
  },
  flexStartContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%')
  },
  input: {
    backgroundColor: 'white',
    color: '#E8E9ED',
    borderRadius: 3,
    height: hp('9%'),
    padding: hp('1%'),
    marginTop: hp('4%'),
  },
  protectedInput: {
    color: '#333333',
    backgroundColor: '#D8D8D6',
  },
  birthdayIcon: {
    color: '#787974',
    marginTop: hp('4%'),
    position:'absolute',
  },
  cepLabel: {
    color: '#787974',
    textAlign: 'center',
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
    fontWeight: '700',
    padding: hp('1%'),
    marginTop: hp('4%'),
  },
  twoColumnsInput: {
    width: wp('42%')
  },
  eightySizeInput: {
    width: wp('70%')
  },
  sixtySizeInput: {
    width: wp('60%')
  },
  fiftyFiveSizeInput: {
    width: wp('55%')
  },
  twentySizeInput: {
    width: wp('20%')
  },
  thirtySizeInput: {
    width: wp('30%')
  },
  complementMargin: {
    marginLeft: wp('5%')
  },
  buttonSignin: {
    backgroundColor: '#2AA3D8',
    marginTop: hp('5%'),
    marginBottom: hp('5%'),
    width: wp('45%'),
    height: hp('7%'),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  buttonSigninText: {
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: hp('2%'),
    fontWeight: '700'
  }
});

export default CadastralForm;