import { Field, Formik } from 'formik';
import React from 'react';
import { TextInput, CheckBox, StyleSheet, Text, View, TouchableOpacity, Picker } from 'react-native';
import PlainTextInput from './Elements/PlainTextInput';
import MaskTextInput from './Elements/MaskTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from '../ProgressBar'
import Icon from "react-native-vector-icons";
import { Platform } from 'react-native';
import EncryptPayment from '../../utils/cryptoFactory';

export class FormPagamento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Progress_Value: 1.00,
      cardType: null,
      form: this.props.navigation.state.params.form
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
    } else if (numero_cartao.trim().length === '16') {
      errors.numero_cartao = 'Quantidade de digitos está inválida.';
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
    } else if (numero_cartao.trim().length === '5') {
      errors.numero_cartao = 'Quantidade de digitos está inválida.';
    }
    if (ccv === undefined) {
      errors.ccv = 'Obrigatório';
    } else if (ccv.trim() === '') {
      errors.ccv = 'O campo não pode estar vazio.';
    } else if (numero_cartao.trim().length === '3') {
      errors.numero_cartao = 'Quantidade de digitos está inválida.';
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
            dv: dv,
          }
          this.state.form.pagamentoForm = pagamentoForm
          this._requestForm()
          //this.props.navigation.navigate('App')
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
                  <TouchableOpacity style={styles.checkLabel} onPress={this.navigateToTermosUso}>
                    <Text style={{fontSize:hp('1.7%')}}>Declaro que li e aceito os 
                      <Text style={{fontWeight: "bold", textDecorationLine:'underline'}}> Termos de Uso</Text>
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.checkBoxContainer}>
                  <CheckBox style={styles.checkBox} />
                  <TouchableOpacity style={styles.checkLabel} onPress={this.navigateToTermosResponsabilidade}>
                  <Text style={{fontSize:hp('1.7%')}} >Declaro que li e aceito os 
                      <Text style={{fontWeight: "bold", textDecorationLine:'underline'}}> Termos de Responsabilidade</Text>
                  </Text>
                  </TouchableOpacity>
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

  navigateToTermosUso = async () => {
    this.props.navigation.navigate('TermosUso')
  };

  navigateToTermosResponsabilidade = async () => {
    this.props.navigation.navigate('TermosResponsabilidade')
  };

  _requestForm = async () => {
    const paymentInfo = {
      numero:this.state.form.pagamentoForm.numero_cartao,
      cvv:this.state.form.pagamentoForm.ccv,
      anoVencimento:'20'+this.state.form.pagamentoForm.validade.substring(3,5),
      mesVencimento:this.state.form.pagamentoForm.validade.substring(0,2),
      agencia:this.state.form.pagamentoForm.agencia,
      conta:this.state.form.pagamentoForm.conta,
   }
    const formRequest = {
      credenciais: {
          credencial: this.state.form.cadastralForm.credencial,
          usuario: this.state.form.cadastralForm.user,
          tipo: 0
      },
      cadastrais: {
          nome: this.state.form.cadastralForm.name,
          dataNascimento: this.state.form.cadastralForm.birthday,
          email: this.state.form.cadastralForm.email,
          telefone: this.state.form.cadastralForm.telphone,
          rg: this.state.form.cadastralForm.rg,
          cpf: this.state.form.cadastralForm.cpf,
          cep: this.state.form.cadastralForm.cep,
          cidade: this.state.form.cadastralForm.cidade,
          bairro: this.state.form.cadastralForm.bairro,
          rua: this.state.form.cadastralForm.endereco,
          numero: this.state.form.cadastralForm.numero,
          complemento: this.state.form.cadastralForm.complemento,
          longitude: this.state.form.cadastralForm.longitude,
          latitude: this.state.form.cadastralForm.latitude,
          documento: null,
          prova: null
      },
      // Faltou objeto para enviar foto de documento e pessoa
      curriculares: {
          formacao: [
              {
                  escolaridade: this.state.form.escolaridadeForm.escolaridade,
                  instituicao: this.state.form.escolaridadeForm.instituicao,
                  anoConclusao: this.state.form.escolaridadeForm.ano
              }
          ],
          oab: this.state.form.escolaridadeForm.oab,
          curriculum: this.state.form.escolaridadeForm.curriculum
      },
      pagamento: paymentInfo
      // pagamento: EncryptPayment(paymentInfo)
  }
  console.log(formRequest)
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
    marginTop: hp('1%')
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