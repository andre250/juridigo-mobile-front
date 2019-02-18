import { Field, Formik } from 'formik';
import React from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Picker } from 'react-native';
import PlainTextInput from './Elements/PlainTextInput';
import MaskTextInput from './Elements/MaskTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from '../../components/ProgressBar'
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from 'react-native';
import { DocumentPicker } from 'expo';
import { CustomDatePicker } from '../../components/CustomDatePicker'


const state = {
  Progress_Value: 0.75,
  date: null
}

const validate = ({ escolaridade, instituicao, ano, oab, curriculum }) => {
  const errors = {};
  if (escolaridade === undefined) {
    errors.escolaridade = 'Obrigatório';
  } else if (escolaridade.trim() === '') {
    errors.escolaridade = 'O campo não pode estar vazio.';
  }
  if (instituicao === undefined) {
    errors.instituicao = 'Obrigatório';
  } else if (instituicao.trim() === '') {
    errors.instituicao = 'O campo não pode estar vazio.';
  }
  if (ano === undefined) {
    errors.ano = 'Obrigatório';
  } else if (ano.trim() === '') {
    errors.ano = 'O campo não pode estar vazio.';
  }
  if (oab === undefined) {
    errors.oab = 'Obrigatório';
  } else if (oab.trim() === '') {
    errors.oab = 'O campo não pode estar vazio.';
  }
  if (curriculum === undefined) {
    errors.curriculum = 'Obrigatório';
  } else if (curriculum.trim() === '') {
    errors.curriculum = 'O campo não pode estar vazio.';
  }
  return errors;
};

const FormEscolaridade = (props) => (
  <Formik
    onSubmit={({ escolaridade, instituicao, ano, oab, curriculum }) => {
      escolaridadeForm = {
        escolaridade: escolaridade,
        instituicao: instituicao,
        ano: ano,
        oab: oab,
        curriculum: curriculum
      }
      props.navigation.navigate('Pagamento')
    }}
    //validate={validate}
    render={({
      handleSubmit,
      isValid,
    }) => (
        <View style={styles.container}>
          <View style={styles.spaceAroundContainer}>
            <Field name="instituicao" 
            component={PlainTextInput}
            placeholder='Instituição' 
            customStyle={[styles.input]} />
          </View>
          <View style={styles.dataPickerContainer}>
            <Field name="ano"
              maskType="datetime"
              maskOptions={{ format: 'YYYY' }}
              component={MaskTextInput}
              placeholder='Ano de Conclusão'
              placeholderTextColor={'#787974'}
              keyboardType='phone-pad'
              customStyle={[styles.input, {width:wp('35%')}, styles.protectedInput]} />
            <Icon style={[styles.protectedInput, styles.birthdayIcon]} name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"} color="#9E9C9D" size={hp('5%')} />
          </View>
          <View style={styles.flexStartContainer}>
            <Field name="oab"
              maskType="custom"
              maskOptions={{ mask: '99999999' }}
              component={MaskTextInput}
              placeholder='OAB'
              customStyle={[styles.input, {width:wp('42%')},]} />
          </View>
          <TouchableOpacity style={styles.uploadDocument} onPress={this._pickDocument}>
            <Icon name={"ios-paper"} size={hp('10%')} color='#fff' style={styles.uploadDocumentIcon} />
            <Text style={styles.uploadDocumentText}>Anexe o seu curriculo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSignin} /*disabled={!isValid}*/ onPress={handleSubmit}>
            <Text style={styles.buttonSigninText}>PRÓXIMO</Text>
          </TouchableOpacity>
          <ProgressBar Progress_Value={state.Progress_Value} />
        </View>
      )}
  />
);

_pickDocument = async () => {
  let arquivo = await DocumentPicker.getDocumentAsync({});
  alert('O seguinte documento foi escolhido ' + arquivo.uri);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E9ED',
    flex: 1,
  },
  dataPickerContainer: {
    flexDirection: 'row',
    marginLeft: hp('2%'),
  },
  birthdayIcon: {
    height:hp('7%'),
    paddingRight:wp('5%'),
    marginTop:hp('3%'),
    // alignSelf:'center',
    textAlignVertical:'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  spaceAroundContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%')
  },
  flexStartContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%')
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
    marginLeft: hp('2%'),
    marginTop: hp('3%')
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
  sixtySizeInput: {
    width: wp('60%')
  },
  uploadDocument: {
    backgroundColor: '#2AA3D8',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 3,
    padding: hp('2%'),
    marginTop: hp('10%'),
  },
  uploadDocumentText: {
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700'
  },
  uploadDocumentIcon: {
    alignSelf: 'center'
  }
});

export default FormEscolaridade;