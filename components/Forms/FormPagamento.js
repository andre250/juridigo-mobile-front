import { Field, Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker, Linking } from 'react-native';
import PlainTextInput from './Elements/PlainTextInput';
import MaskTextInput from './Elements/MaskTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from '../ProgressBar'
import Icon from "react-native-vector-icons";
import { Platform, Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import User from '../../http_factory/user';
// import EncryptPayment from '../../utils/cryptoFactory';

export class FormPagamento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Progress_Value: 1.00,
      cardType: null,
      usoCheck: false,
      responsabilidadeCheck: false,
      banco:"Selecione um banco",
      form: this.props.navigation.state.params.form
    }
    
  }

  validate = ({ numero_cartao, nome_impresso, validade, ccv, 
    agencia, conta }) => {
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
    } else if (numero_cartao.trim().length !== '16') {
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
    } else if (validade.length !== 5) {
      errors.validade = 'Quantidade de \n digitos está inválida.';
    }
    if (ccv === undefined) {
      errors.ccv = 'Obrigatório';
    } else if (ccv.trim() === '') {
      errors.ccv = 'O campo não pode estar vazio.';
    } else if (ccv.length !== 3) {
      errors.ccv = 'Quantidade de \n digitos está inválida.';
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
    return errors;
  };

  render() {
    return (
      <Formik
        onSubmit={({ numero_cartao, nome_impresso, validade, ccv, banco, agencia, conta }) => {
          pagamentoForm = {
            numero_cartao: numero_cartao,
            nome_impresso: nome_impresso,
            validade: validade,
            ccv: ccv,
            banco: banco,
            agencia: agencia,
            conta: conta,
          }
          if (this.state.usoCheck && this.state.responsabilidadeCheck) {
            // Persiste os formularios para a próxima página
            this.state.form.pagamentoForm = pagamentoForm
            this._requestForm()
            //this.props.navigation.navigate('App')
          } else {
            Alert.alert('Você precisa aceitar os termos para continuar.');
          }
          
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
                <Picker name="banco"
                  selectedValue={this.state.banco}
                  onValueChange={(bank) => this.setState({banco: bank})}
                  style={[styles.input, { width: wp('60%'), color: '#787974' }]} >
                  <Picker.Item label="Selecione um banco" value="null" />
                  <Picker.Item label="Banco do Brasil S.A." value="001" />
                  <Picker.Item label="Banco Santander (Brasil) S.A." value="033" />
                  <Picker.Item label="Itaú Unibanco Holding S.A." value="652" />   
                  <Picker.Item label="Banco Bradesco S.A." value="237" />   
                  <Picker.Item label="Banco Citibank S.A." value="745" />   
                  <Picker.Item label="HSBC Bank Brasil S.A. – Banco Múltiplo" value="399" />    
                  <Picker.Item label="Caixa Econômica Federal" value="104" />   
                  <Picker.Item label="Banco Mercantil do Brasil S.A." value="389" />   
                  <Picker.Item label="Banco Rural S.A." value="453" />
                  <Picker.Item label="Banco Safra S.A." value="422" />   
                  <Picker.Item label="Banco Itaú S.A." value="341" />   
                  <Picker.Item label="Banco Rendimento S.A." value="633" />   
                  </Picker>
              </View>
              <View style={styles.flexStartContainer}>
                <Field name="agencia"
                  component={PlainTextInput}
                  placeholderTextColor={'#787974'}
                  placeholder='Agência'
                  customStyle={[styles.input, { width: wp('20%'), marginRight: wp('2%') }, styles.protectedInput]} />
                <Field name="conta"
                  component={PlainTextInput}
                  placeholderTextColor={'#787974'}
                  placeholder='Conta (Com o digito)'
                  customStyle={[styles.input, { width: wp('70%') }, styles.protectedInput]} />
              </View>
              <View style={styles.optInContainer}>
                <View style={styles.checkBoxContainer}>
                <CheckBox
                      style={styles.checkBox}
                      onClick={()=>{
                        this.setState({
                          usoCheck:!this.state.usoCheck
                        })
                      }}
                      isChecked={this.state.usoCheck}
                  />
                  <TouchableOpacity style={styles.checkLabel} onPress={ ()=>{ Linking.openURL('https://juridigo.com.br/politica-de-privacidade-juridigo/')}}>
                    <Text style={{fontSize:hp('1.7%')}}>Declaro que li e aceito os <Text style={{fontWeight: "bold", textDecorationLine:'underline'}}>Termos de Uso</Text></Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.checkBoxContainer}>
                <CheckBox
                      style={styles.checkBox}
                      onClick={()=>{
                        this.setState({
                          responsabilidadeCheck:!this.state.responsabilidadeCheck
                        })
                      }}
                      isChecked={this.state.responsabilidadeCheck}
                  />
                  <TouchableOpacity style={styles.checkLabel} onPress={ ()=>{ Linking.openURL('https://juridigo.com.br/termos-e-condicoes-gerais-de-uso-juridigo-ltda/')}}>
                  <Text style={{fontSize:hp('1.7%')}} >Declaro que li e aceito os <Text style={{fontWeight: "bold", textDecorationLine:'underline'}}>Termos de Responsabilidade</Text></Text>
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
          documento: this.state.form.documentForm.foto_documento,
          prova: this.state.form.documentForm.foto_pessoa
      },
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
  console.log('aqui')
  try {
    console.log(formRequest)
    //const registro = await User.register(formRequest);
    //await AsyncStorage.setItem('userToken', token);
    //const decoded = jwtDecode(token);    
    //this.setState({ loading: false });
  } catch (error) {
    console.log(error)
    //this.setState({ loading: false });
    return Alert.alert(
      'Houve um erro no processo de cadastro',
      'Por favor verifique e tente novamente mais tarde.'
    );
  };
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
    height: hp('5%')
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