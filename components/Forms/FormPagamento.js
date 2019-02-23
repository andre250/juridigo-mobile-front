import { Field, Formik } from 'formik';
import React from 'react';
import { TextInput, CheckBox, StyleSheet, Text, View, TouchableOpacity, Picker } from 'react-native';
import PlainTextInput from './Elements/PlainTextInput';
import MaskTextInput from './Elements/MaskTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from '../ProgressBar'
import Icon from "react-native-vector-icons";
import { Platform } from 'react-native';


export class FormPagamento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Progress_Value: 1.00,
      cardType: null
    }
  }

  validate = ({ numero_cartao, nome_impresso, validade, ccv, 
    banco, agencia, conta, dv }) => {
    const errors = {};
    if (numero_cartao === undefined) {
      errors.numero_cartao = 'Obrigatório';
    } else if (numero_cartao.trim() === '') {
      this.setState({ cardType: null });
      errors.numero_cartao = 'O campo não pode estar vazio.';
    } else if (numero_cartao.charAt(0) === '4') {
      this.setState({ cardType: 'cc-visa' });
    } else if (numero_cartao.charAt(0) === '5') {
      this.setState({ cardType: 'cc-mastercard' });
    } else if (numero_cartao.charAt(0) != '4' || numero_cartao.charAt(0) != '5') {
      this.setState({ cardType: null });
    }
    if (nome_impresso === undefined) {
      errors.nome_impresso = 'Obrigatório';
    } else if (nome_impresso.trim() === '') {
      errors.nome_impresso = 'O campo não pode estar vazio.';
    }
    if (validade === undefined) {
      errors.validade = 'Obrigatório';
    } else if (validade.trim() === '') {
      errors.validade = 'O campo não pode estar vazio.';
    }
    if (ccv === undefined) {
      errors.ccv = 'Obrigatório';
    } else if (ccv.trim() === '') {
      errors.ccv = 'O campo não pode estar vazio.';
    }
    if (banco === undefined) {
      errors.banco = 'Obrigatório';
    } else if (banco.trim() === '') {
      errors.banco = 'O campo não pode estar vazio.';
    }
    if (agencia === undefined) {
      errors.agencia = 'Obrigatório';
    } else if (agencia.trim() === '') {
      errors.agencia = 'O campo não pode estar vazio.';
    }
    if (conta === undefined) {
      errors.conta = 'Obrigatório';
    } else if (conta.trim() === '') {
      errors.conta = 'O campo não pode estar vazio.';
    }
    if (dv === undefined) {
      errors.dv = 'Obrigatório';
    } else if (dv.trim() === '') {
      errors.dv = 'O campo não pode estar vazio.';
    }
    return errors;
  };

  render() {
    return (
      <Formik
        onSubmit={({ numero_cartao, nome_impresso, validade, ccv, banco, agencia, conta, dv }) => {
          pagamentoForm = {
            numero_cartao: numero_cartao,
            nome_impresso: nome_impresso,
            validade: validade,
            ccv: ccv,
            banco: banco,
            agencia: agencia,
            conta: conta,
            dv: dv
          }
          props.navigation.navigate('App')
        }}
        validate={this.validate}
        render={({
          handleSubmit,
          isValid,
        }) => (
            <View style={styles.container}>
              <View style={styles.cardContainer}>
                <Field name="numero_cartao"
                  maskType="credit-card"
                  component={MaskTextInput}
                  placeholder='N. do cartão'
                  keyboardType='phone-pad'
                  customStyle={[styles.input, { width: wp('70%') }]} />
                {this.state.cardType ? <Icon.FontAwesome style={[styles.cardIcon]} name={this.state.cardType} color="#9E9C9D" size={hp('5%')} /> : null}
              </View>
              <View style={styles.spaceAroundContainer}>
                <Field name="nome_impresso"
                  component={PlainTextInput}
                  placeholder='Nome Impresso'
                  customStyle={styles.input} />
              </View>
              <View style={styles.dataPickerContainer}>
                <Field name="validade"
                  maskType="datetime"
                  maskOptions={{ format: 'MM/YY' }}
                  component={MaskTextInput}
                  placeholder='Data Validade'
                  placeholderTextColor={'#787974'}
                  keyboardType='phone-pad'
                  customStyle={[styles.input, { width: wp('35%') }, styles.protectedInput]} />
                <Icon.Ionicons style={[styles.protectedInput, styles.birthdayIcon]} name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"} color="#9E9C9D" size={hp('5%')} />
                <Field name="ccv"
                  maskType="custom"
                  maskOptions={{ mask: '999' }}
                  component={MaskTextInput}
                  placeholder='CCV'
                  keyboardType='phone-pad'
                  customStyle={[styles.input, { width: wp('20%') }]} />
              </View>
              <View style={styles.flexStartContainer}>
                <Field name="banco"
                  component={PlainTextInput}
                  placeholderTextColor={'#787974'}
                  placeholder='Banco'
                  customStyle={[styles.input, { width: wp('60%') }]} />
              </View>
              <View style={styles.spaceBetweenContainer}>
                <Field name="agencia"
                  component={PlainTextInput}
                  placeholderTextColor={'#787974'}
                  placeholder='Agência'
                  customStyle={[styles.input, { width: wp('20%') }, styles.protectedInput]} />
                <Field name="conta"
                  component={PlainTextInput}
                  placeholderTextColor={'#787974'}
                  placeholder='Conta'
                  customStyle={[styles.input, { width: wp('40%') }, styles.protectedInput]} />
                <Field name="dv"
                  component={PlainTextInput}
                  placeholder='DV'
                  customStyle={[styles.input, { width: wp('10%') }]} />
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
              <TouchableOpacity style={styles.buttonSignin} disabled={!isValid} onPress={handleSubmit}>
                <Text style={styles.buttonSigninText}>CONCLUIR</Text>
              </TouchableOpacity>
              <View style={styles.footer}>
                <ProgressBar Progress_Value={this.state.Progress_Value} />
              </View>
            </View>
          )}
      />)
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E9ED',
    flex: 1,
  },
  footer: {
    flex: 1,
    alignSelf: 'flex-end',
    height: hp('7%')
  },
  optInContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%'),
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dataPickerContainer: {
    flexDirection: 'row',
    marginLeft: hp('2%'),
  },
  cardIcon: {
    height: hp('7%'),
    marginLeft: wp('2%'),
    marginTop: hp('2%'),
    alignSelf: 'center',
    textAlignVertical: 'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  birthdayIcon: {
    height: hp('7%'),
    paddingRight: wp('5%'),
    marginRight: wp('2%'),
    marginTop: hp('2%'),
    alignSelf: 'center',
    textAlignVertical: 'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  checkBox: {
    alignSelf: 'center'
  },
  checkLabel: {
    textAlign: 'left',
    textAlignVertical: 'center',
    alignSelf: 'center',
    color: '#787974',
    fontSize: hp('1.7%')
  },
  spaceBetweenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%'),
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%'),
  },
  spaceAroundContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%'),
  },
  flexStartContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%'),
  },
  protectedInput: {
    color: '#333333',
    backgroundColor: '#D8D8D6',
  },
  input: {
    backgroundColor: 'white',
    color: '#E8E9ED',
    borderRadius: 3,
    height: hp('7%'),
    padding: hp('1%'),
    marginTop: hp('2%'),
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
  }
});

  export default FormPagamento;