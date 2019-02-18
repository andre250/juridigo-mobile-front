import React from 'react';
import { TextInput, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from '../../components/ProgressBar'
import { CustomDatePicker } from '../../components/CustomDatePicker'
import { TextTitle } from '../../components/TextTitle';

export class CadastralScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Progress_Value: 0.25,
      date: null,
    }
  }

  static navigationOptions = {
    header: (
      <TextTitle title='DADOS CADASTRAIS' showIcon={false} />
    )
  };

  render() {
    return (
        <ScrollView style={styles.container}>
          <View style={styles.spaceAroundContainer}>
            <TextInput placeholder='Nome Completo' style={styles.input} />
            <TextInput keyboardType='email-address' placeholder='Email' style={styles.input} />
          </View>
          <View style={styles.spaceBetweenContainer}>
            <TextInput secureTextEntry placeholder='Senha' style={[styles.input, styles.twoColumnsInput]} />
            <TextInput secureTextEntry placeholder='Confirmar Senha' style={[styles.input, styles.twoColumnsInput]} />
          </View>
          <View style={styles.spaceBetweenContainer}>
            <TextInput keyboardType='phone-pad' placeholder='Celular' style={[styles.input, styles.twoColumnsInput]} />
            <TextInput keyboardType='phone-pad' placeholder='Telefone' style={[styles.input, styles.twoColumnsInput]} />
          </View>
          <CustomDatePicker placeHolder='Data Nascimento' date={this.state.date} onDateChange={(date) => { this.setState({ date: date }) }} />
          <View style={styles.spaceBetweenContainer}>
            <TextInput keyboardType='phone-pad' placeholder='CPF' style={[styles.input, styles.twoColumnsInput]} />
            <TextInput keyboardType='phone-pad' placeholder='RG' style={[styles.input, styles.twoColumnsInput]} />
          </View>
          <View style={styles.spaceBetweenContainer}>
            <TextInput keyboardType='phone-pad' placeholder='CEP' style={[styles.input, styles.fiftyFiveSizeInput]} />
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
          <TouchableOpacity style={styles.buttonSignin} onPress={this._movePagesAsync}>
            <Text style={styles.buttonSigninText}>PRÓXIMO</Text>
          </TouchableOpacity>
          <ProgressBar Progress_Value={this.state.Progress_Value} />
        </ScrollView>
    );
  }

  _movePagesAsync = async () => {
    this.props.navigation.navigate('Document');
  };
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
    color: '#333333',
    borderRadius: 3,
    height: hp('9%'),
    padding: hp('1%'),
    marginTop: hp('4%'),
  },
  protectedInput: {
    color: '#333333',
    backgroundColor: '#D8D8D6',
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
  },
  dateInput: {
    borderWidth: 0,
    backgroundColor: '#D8D8D6',
    borderRadius: 3,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: hp('9%'),
    padding: hp('1%'),
  },
  dateText: {
    color: '#333333',
    alignSelf: 'flex-start'
  },
  placeholderText: {
    color: '#9E9C9D',
    alignSelf: 'flex-start'
  }
});

export default CadastralScreen;