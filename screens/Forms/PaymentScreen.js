import React from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, CheckBox } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from '../../components/ProgressBar'
import { Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import { TextTitle } from '../../components/TextTitle';

class PaymentScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Progress_Value: 1.00,
    }
  }

  static navigationOptions = {
    header: (
      <TextTitle title='DADOS PAGAMENTO' showIcon={true} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.spaceAroundContainer}>
          <TextInput placeholder='N do cartão' style={[styles.input, styles.twoColumnsInput]} />
        </View>
        <View style={styles.spaceAroundContainer}>
          <TextInput placeholder='Nome Impresso' style={[styles.input, styles.twoColumnsInput]} />
        </View>
        <View style={styles.flexStartContainer}>
          <TextInput placeholderTextColor={'#787974'} placeholder='Validade' style={[styles.input, styles.sixtySizeInput, styles.protectedInput]} />
          <Icon style={styles.calendarIcon} name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"} color="#9F9F9F" size={hp('5%')} />
          <TextInput placeholder='CCV' style={[styles.input, styles.twentySizeInput]} />
        </View>
        <View style={styles.flexStartContainer}>
          <TextInput placeholderTextColor={'#787974'} placeholder='Banco' style={[styles.input, styles.sixtySizeInput]} />
        </View>
        <View style={styles.spaceBetweenContainer}>
          <TextInput placeholderTextColor={'#787974'} placeholder='Agência' style={[styles.input, styles.twentySizeInput, styles.protectedInput]} />
          <TextInput placeholderTextColor={'#787974'} placeholder='Conta' style={[styles.input, styles.fourtySizeInput, styles.protectedInput]} />
          <TextInput placeholder='DV' style={[styles.input, styles.tenSizeInput]} />
        </View>
        <View style={styles.optInContainer}>
          <View style={styles.checkBoxContainer}>
            <CheckBox style={styles.checkBox} />
            <Text style={styles.checkLabel}>Declaro que li e aceito os Termos de Uso</Text>
          </View>

          <View style={styles.checkBoxContainer}>
            <CheckBox style={styles.checkBox} />
            <Text style={styles.checkLabel}>Declaro que li e aceito os Termos de Responsabilidade</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.buttonSignin} onPress={this._movePagesAsync}>
          <Text style={styles.buttonSigninText}>CONCLUIR</Text>
        </TouchableOpacity>
        <ProgressBar Progress_Value={this.state.Progress_Value} />
      </View>
    );
  }
  _movePagesAsync = async () => {
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E9ED',
    flex: 1,
  },
  optInContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%'),
    paddingTop:hp('6%'),
  },
  checkBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop:hp('3%'),
    marginTop:hp('1.5%'),
  },
  checkBox: {
    alignSelf: 'center'
  },
  checkLabel: {
    textAlign: 'left',
    textAlignVertical: 'center',
    alignSelf: 'center',
    color: '#787974',
    fontSize:hp('1.7%')
  },
  spaceBetweenContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%'),
    paddingTop:hp('2%'),
  },
  spaceAroundContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%'),
    paddingTop:hp('2%'),
  },
  flexStartContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%'),
    paddingTop:hp('2%'),
  },
  protectedInput: {
    color: '#333333',
    backgroundColor: '#D8D8D6',
  },
  input: {
    backgroundColor: 'white',
    color: '#E8E9ED',
    borderRadius: 3,
    height: hp('8%'),
    padding: hp('1%'),
    marginTop: hp('4%'),
  },
  calendarIcon: {
    color: '#787974',
    textAlign: 'center',
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
    fontWeight: '700',
    padding: hp('1%'),
    marginTop: hp('4%'),
  },
  buttonSignin: {
    backgroundColor: '#2AA3D8',
    marginTop: hp('7%'),
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
  sixtySizeInput: {
    width: wp('60%')
  },
  fourtySizeInput: {
    width: wp('40%')
  },
  twentySizeInput: {
    width: wp('20%')
  },
  tenSizeInput: {
    width: wp('10%')
  },
});

export default PaymentScreen;