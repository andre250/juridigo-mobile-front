import { Field, Formik } from 'formik';
import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import PlainTextInput from './Elements/PlainTextInput';
import MaskTextInput from './Elements/MaskTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from '../../components/ProgressBar'
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from 'react-native';

const state = {
  date: null,
  Progress_Value: 0.25,
  page: 'documento'
}

const validate = ({ name, email, pass, 
  confirmPass, celphone, rg, cpf, 
  numero, complemento, cep }) => {
  const errors = {};
  if (name === undefined) {
    errors.name = 'Obrigatório';
  } else if (name.trim() === '') {
    errors.name = 'O campo não pode estar vazio.';
  }
  if (email === undefined) {
    errors.email = 'Obrigatório';
  } else if (email.trim() === '') {
    errors.email = 'O campo não pode estar vazio.';
  }
  if (pass === undefined) {
    errors.pass = 'Obrigatório';
  } else if (pass.trim() === '') {
    errors.pass = 'O campo não pode estar vazio.';
  }
  if (confirmPass === undefined) {
    errors.confirmPass = 'Obrigatório';
  } else if (confirmPass.trim() === '') {
    errors.confirmPass = 'O campo não pode estar vazio.';
  }
  if (celphone === undefined) {
    errors.celphone = 'Obrigatório';
  } else if (celphone.trim() === '') {
    errors.celphone = 'O campo não pode estar vazio.';
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
  return errors;
};

const FormCadastral = (props) => (
  <Formik
    onSubmit={({ name, email, pass, celphone, telphone, 
      birthday, rg, cpf, cep, endereco, numero, complemento, 
      bairro, cidade, uf }) => {
      cadastralForm = {
        name: name,
        email: email,
        pass: pass,
        celphone: celphone,
        telphone: telphone,
        birthday: birthday,
        rg: rg,
        cpf: cpf,
        cep: cep,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        uf: uf
      }
      props.navigation.navigate('Documento')
    }}
    //validate={validate}
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
              customStyle={[styles.input, {width:wp('42%')},]} />
            <Field name="confirmPass"
              component={PlainTextInput}
              placeholder='Confirmar Senha'
              secure={'true'}
              customStyle={[styles.input, {width:wp('42%')},]} />
          </View>
          <View style={styles.spaceBetweenContainer}>
            <Field name="celphone"
              maskType="cel-phone"
              maskOptions={{ withDDD: true, dddMask: '(99) 99999-9999' }}
              component={MaskTextInput}
              placeholder='Celular'
              keyboardType='phone-pad'
              customStyle={[styles.input, {width:wp('42%')},]} />
            <Field name="telphone"
              maskType="cel-phone"
              maskOptions={{ withDDD: true, dddMask: '(99) 99999-9999' }}
              component={MaskTextInput}
              placeholder='Telefone'
              keyboardType='phone-pad'
              customStyle={[styles.input, {width:wp('42%')},]} />
          </View>
          <View style={styles.dataPickerContainer}>
            <Field name="birthday"
              maskType="datetime"
              maskOptions={{ format: 'DD/MM/YYYY' }}
              component={MaskTextInput}
              placeholder='Data Nascimento'
              placeholderTextColor={'#787974'}
              keyboardType='phone-pad'
              customStyle={[styles.input, {width:wp('35%')}, styles.protectedInput]} />
            <Icon style={[styles.protectedInput, styles.birthdayIcon]} name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"} color="#9E9C9D" size={hp('5%')} />
          </View>
          <View style={styles.spaceBetweenContainer}>
            <Field name="rg"
              maskType="custom"
              maskOptions={{ mask: '99.999.999-99' }}
              component={MaskTextInput}
              placeholder='RG'
              keyboardType='phone-pad'
              customStyle={[styles.input, {width:wp('42%')},]} />
            <Field name="cpf"
              maskType="cpf"
              component={MaskTextInput}
              placeholder='CPF'
              keyboardType='phone-pad'
              customStyle={[styles.input, {width:wp('42%')},]} />
          </View>
          <View style={styles.spaceBetweenContainer}>
            <Field name="cep"
              maskType="zip-code"
              component={MaskTextInput}
              placeholder='CEP'
              keyboardType='phone-pad'
              customStyle={[styles.input, {width:wp('55%')},]} />
            <Text style={styles.cepLabel}>Não sei o meu CEP</Text>
          </View>
          <View style={styles.spaceAroundContainer}>
            <Field name="endereco"
              component={PlainTextInput}
              placeholder="Endereço"
              disabled
              placeholderTextColor={'#787974'}
              customStyle={[styles.input, styles.protectedInput]} />
          </View>
          <View style={styles.flexStartContainer}>
            <Field name="numero"
              component={PlainTextInput}
              placeholder="N."
              customStyle={[styles.input, {width:wp('25%')},]} />
            <Field name="complemento"
              component={PlainTextInput}
              placeholder="Complemento"
              customStyle={[styles.input, {width:wp('42%')}, styles.complementMargin]} />
          </View>
          <View style={styles.flexStartContainer}>
            <Field name="bairro"
              component={PlainTextInput}
              placeholder="Bairro"
              disabled
              placeholderTextColor={'#787974'}
              customStyle={[styles.input, {width:wp('60%')}, styles.protectedInput]} />
          </View>
          <View style={styles.spaceBetweenContainer}>
            <Field name="cidade"
              component={PlainTextInput}
              placeholder="Cidade"
              disabled
              placeholderTextColor={'#787974'}
              customStyle={[styles.input, {width:wp('70%')}, styles.protectedInput]} />
            <Field name="uf"
              component={PlainTextInput}
              placeholder="UF"
              disabled
              placeholderTextColor={'#787974'}
              customStyle={[styles.input, {width:wp('20%')}, styles.protectedInput]} />
          </View>
          <TouchableOpacity style={styles.buttonSignin} /*disabled={!isValid}*/ onPress={handleSubmit}>
            <Text style={styles.buttonSigninText}>PRÓXIMO</Text>
          </TouchableOpacity>
          <ProgressBar Progress_Value={state.Progress_Value} />
        </ScrollView>
      )}
  />
);

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
  placeholderText: {
    color: '#9E9C9D',
    alignSelf: 'flex-start'
  },
  birthdayIcon: {
    height:hp('7%'),
    paddingRight:wp('5%'),
    marginTop:hp('4%'),
    alignSelf:'center',
    textAlignVertical:'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
});

export default FormCadastral;