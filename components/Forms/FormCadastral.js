import { Field, Formik } from 'formik';
import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import PlainTextInput from './Elements/PlainTextInput';
import MaskTextInput from './Elements/MaskTextInput';
import DynamicTextInput from './Elements/DynamicTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from '../../components/ProgressBar'
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from 'react-native';
import Cep from '../../http_factory/cep';
import OpenCage from '../../http_factory/opencage';
import sha256 from 'js-sha256';

export class FormCadastral extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      Progress_Value: 0.25,
      page: 'documento',
      endereco: null,
      bairro: null,
      cidade: null,
      uf: null,
      complemento: null,
      cep_search: true,
      buttonSignInColor: 'grey',
      latitude: null,
      longitude: null
    }
  }

  _makeRemoteRequestAsync = async (cep) => {
      try {
        const data = await Cep.getAddress(cep) // Inicia requisição para buscar endereço por CEP
        const completeAddress = data.logradouro + ' ' + data.localidade // Buildou o endereço com endereço + bairro
        const latlong = await OpenCage.getLatLong(completeAddress) // Inicia requisição para buscar latitude e longitude
        // Atualiza state da página com novas informações
        this.setState({
          endereco: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
          complemento: data.complemento,
          latitude: latlong.results[0].geometry.lat, // Pega sempre o 1 elemento do array de retorno
          longitude: latlong.results[0].geometry.lng // Pega sempre o 1 elemento do array de retorno
        })
      } catch (error) {
        Alert.alert('Ops', 'Parece que algo deu errado na busca pelo seu endereço, verifique sua conexão e tente novamente mais tarde.', [{ text: 'Ok' }]);
      }
  };

  _setNextButton = async (status) => {
    if (status) {
      this.setState({ buttonSignInColor: '#2AA3D8' });
    } else {
      this.setState({ buttonSignInColor: 'grey' });
    }
  };

  validate = ({ name, email, pass,
    confirmPass, user, telphone, rg, cpf,
    numero, complemento, cep }) => {
    const errors = {};
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (name === undefined) {
      errors.name = 'Obrigatório';
    } else if (name.trim() === '') {
      errors.name = 'O campo não pode estar vazio.';
    }
    if (email === undefined) {
      errors.email = 'Obrigatório';
    } else if (email.trim() === '') {
      errors.email = 'O campo não pode estar vazio.';
    } else if (emailReg.test(email) === false) {
      errors.email = 'O email é inválido';
    }
    if (pass === undefined) {
      errors.pass = 'Obrigatório';
    } else if (pass.trim() === '') {
      errors.pass = 'O campo não pode estar vazio.';
    } else if (pass != confirmPass) {
      errors.pass = 'As senhas não são iguais.';
    }
    if (confirmPass === undefined) {
      errors.confirmPass = 'Obrigatório';
    } else if (confirmPass.trim() === '') {
      errors.confirmPass = 'O campo não pode estar vazio.';
    } else if (confirmPass != pass) {
      errors.confirmPass = 'As senhas não são iguais.';
    }
    if (user === undefined) {
      errors.user = 'Obrigatório';
    } else if (user.trim() === '') {
      errors.user = 'O campo não pode estar vazio.';
    }
    if (telphone === undefined) {
      errors.telphone = 'Obrigatório';
    } else if (telphone.trim() === '') {
      errors.telphone = 'O campo não pode estar vazio.';
    }
    if (rg === undefined) {
      errors.rg = 'Obrigatório';
    } else if (rg.trim() === '') {
      errors.rg = 'O campo não pode estar vazio.';
    }
    if (cpf === undefined) {
      errors.cpf = 'Obrigatório';
    } else if (cpf.trim() === '') {
      errors.cpf = 'O campo não pode estar vazio.';
    }
    if (cep === undefined) {
      errors.cep = 'Obrigatório';
    } else if (cep.trim() === '') {
      errors.cep = 'O campo não pode estar vazio.';
    } else if (cep.length < 8) {
      errors.cep = 'O CEP deve possuir exatamente 8 digitos.';
      this.state.cep_search = true
    } else if (cep.length === 9) {
      if (this.state.cep_search) {
        this._makeRemoteRequestAsync(cep)
        this.state.cep_search = false
      }
    }
    if (numero === undefined) {
      errors.numero = 'Obrigatório';
    } else if (numero.trim() === '') {
      errors.numero = 'O campo não pode estar vazio.';
    }
    if (complemento === undefined) {
      errors.complemento = 'Obrigatório';
    } else if (complemento.trim() === '') {
      errors.complemento = 'O campo não pode estar vazio.';
    }
    if (Object.keys(errors).length === 0) {
      this._setNextButton(true);
    } else {
      this._setNextButton(false);
    }
    return errors;
  };

  render() {
    return (
      <Formik
        onSubmit={({ name, email, pass, user, telphone,
          birthday, rg, cpf, cep, numero }) => {
              cadastralForm = {
                name: name,
                email: email,
                telphone: telphone,
                birthday: birthday,
                rg: rg,
                cpf: cpf,
                cep: cep,
                numero: numero,
                user: user,
                endereco: this.state.endereco,
                complemento: this.state.complemento,
                bairro: this.state.bairro,
                cidade: this.state.cidade,
                uf: this.state.uf,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                credencial: sha256.create().update(user + "@" + pass).hex()
              }
              this.props.navigation.navigate('Documento', {
                form: {
                  cadastralForm: cadastralForm
                }
              });
        }}
        //validate={this.validate}
        render={({
          handleSubmit,
          isValid,
        }) => (
            <ScrollView style={styles.container}>
              <View style={styles.spaceAroundContainer}>
                <Field name="name"
                  component={PlainTextInput}
                  placeholder="Nome Completo"
                  customStyle={styles.input} />
                <Field name="email"
                  component={PlainTextInput}
                  placeholder="Email"
                  keyboardType="email-address"
                  customStyle={styles.input} />
              </View>
              <View style={styles.spaceBetweenContainer}>
                <Field name="pass"
                  component={PlainTextInput}
                  placeholder="Senha"
                  secure={'true'}
                  customStyle={[styles.input, { width: wp('42%') },]} />
                <Field name="confirmPass"
                  component={PlainTextInput}
                  placeholder='Confirmar Senha'
                  secure={'true'}
                  customStyle={[styles.input, { width: wp('42%') },]} />
              </View>
              <View style={styles.spaceBetweenContainer}>
                <Field name="user"
                  component={PlainTextInput}
                  placeholder='Usuário'
                  customStyle={[styles.input, { width: wp('42%') },]} />
                <Field name="telphone"
                  maskType="custom"
                  maskOptions={{ mask:'(99) 9999-99999'}}
                  component={MaskTextInput}
                  placeholder='Telefone'
                  keyboardType='phone-pad'
                  customStyle={[styles.input, { width: wp('42%') },]} />
              </View>
              <View style={styles.dataPickerContainer}>
                <Field name="birthday"
                  maskType="datetime"
                  maskOptions={{ format: 'DD/MM/YYYY' }}
                  component={MaskTextInput}
                  placeholder='Data Nascimento'
                  placeholderTextColor={'#787974'}
                  keyboardType='phone-pad'
                  customStyle={[styles.input, { width: wp('35%') }, styles.protectedInput]} />
                <Icon style={[styles.protectedInput, styles.birthdayIcon]} name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"} color="#9E9C9D" size={hp('5%')} />
              </View>
              <View style={styles.spaceBetweenContainer}>
                <Field name="rg"
                  component={PlainTextInput}
                  placeholder='RG'
                  customStyle={[styles.input, { width: wp('42%') },]} />
                <Field name="cpf"
                  maskType="cpf"
                  component={MaskTextInput}
                  placeholder='CPF'
                  keyboardType='phone-pad'
                  customStyle={[styles.input, { width: wp('42%') },]} />
              </View>
              <View style={styles.spaceBetweenContainer}>
                <Field name="cep"
                  maskType="zip-code"
                  component={MaskTextInput}
                  placeholder='CEP'
                  keyboardType='phone-pad'
                  customStyle={[styles.input, { width: wp('55%') }]}
                />
              </View>
              <View style={styles.spaceAroundContainer}>
                <Field name="endereco"
                  component={DynamicTextInput}
                  placeholder="Endereço"
                  disabled
                  placeholderTextColor={'#787974'}
                  value={this.state.endereco}
                  customStyle={[styles.input, styles.protectedInput]} />
              </View>
              <View style={styles.flexStartContainer}>
                <Field name="numero"
                  component={PlainTextInput}
                  placeholder="N."
                  customStyle={[styles.input, { width: wp('25%') },]} />
                <Field name="complemento"
                  component={PlainTextInput}
                  placeholder="Complemento"
                  customStyle={[styles.input, { width: wp('42%') }, styles.complementMargin]} />
              </View>
              <View style={styles.flexStartContainer}>
                <Field name="bairro"
                  component={DynamicTextInput}
                  placeholder="Bairro"
                  disabled
                  placeholderTextColor={'#787974'}
                  value={this.state.bairro}
                  customStyle={[styles.input, { width: wp('60%') }, styles.protectedInput]} />
              </View>
              <View style={styles.spaceBetweenContainer}>
                <Field name="cidade"
                  component={DynamicTextInput}
                  placeholder="Cidade"
                  disabled
                  placeholderTextColor={'#787974'}
                  value={this.state.cidade}
                  customStyle={[styles.input, { width: wp('70%') }, styles.protectedInput]} />
                <Field name="uf"
                  component={DynamicTextInput}
                  placeholder="UF"
                  disabled
                  placeholderTextColor={'#787974'}
                  value={this.state.uf}
                  customStyle={[styles.input, { width: wp('20%') }, styles.protectedInput]} />
              </View>
              <TouchableOpacity style={[styles.buttonSignin, 
                {backgroundColor:this.state.buttonSignInColor}]} 
                 /*disabled={!isValid}*/ onPress={handleSubmit}>
                <Text style={styles.buttonSigninText}>PRÓXIMO</Text>
              </TouchableOpacity>
              <View style={styles.footer}>
                <ProgressBar Progress_Value={this.state.Progress_Value} />
              </View>
            </ScrollView>
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
  dataPickerContainer: {
    flexDirection: 'row',
    marginLeft: hp('2%'),
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
    height: hp('7%'),
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
  complementMargin: {
    marginLeft: wp('5%')
  },
  buttonSignin: {
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
  placeholderText: {
    color: '#9E9C9D',
    alignSelf: 'flex-start'
  },
  birthdayIcon: {
    height: hp('7%'),
    paddingRight: wp('5%'),
    marginTop: hp('4%'),
    alignSelf: 'center',
    textAlignVertical: 'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
});

export default FormCadastral;