import { Field, Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Picker } from 'react-native';
import PlainTextInput from './Elements/PlainTextInput';
import MaskTextInput from './Elements/MaskTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from '../../components/ProgressBar'
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from 'react-native';
import { DocumentPicker } from 'expo';
import base64 from 'base-64';
import utf8 from 'utf8';

export class FormEscolaridade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Progress_Value: 0.75,
      fileName: null,
      fileContent: null,
      buttonColor: '#2AA3D8',
      buttonIcon: 'ios-paper',
      form: this.props.navigation.state.params.form
    }
  }

  validate = ({instituicao, ano, oab }) => {
    const errors = {};
    if (instituicao === undefined) {
      errors.instituicao = 'Obrigatório';
    } else if (instituicao.trim() === '') {
      errors.instituicao = 'O campo não pode estar vazio.';
    }
    if (ano === undefined) {
      errors.ano = 'Obrigatório';
    } else if (ano.trim() === '') {
      errors.ano = 'O campo não pode estar vazio.';
    } else if (ano.length !== 4) {
      errors.ano = 'O campo ano deve possuir 4 caracteres.';
    } 
    if (oab === undefined) {
      errors.oab = 'Obrigatório';
    } else if (oab.trim() === '') {
      errors.oab = 'O campo não pode estar vazio.';
    } else if (oab.length !== 7) {
      errors.oab = 'O campo oab deve possuir 7 caracteres.';
    }
    return errors;
  };

  render() {
    return (
      <Formik
        onSubmit={({ instituicao, ano, oab }) => {
          escolaridadeForm = {
            escolaridade: 'Ensino Superior',
            instituicao: instituicao,
            ano: ano,
            oab: oab,
            curriculum: this.state.fileContent,
          }
          // Persiste os formularios para a próxima página
          this.props.navigation.navigate('Pagamento', {
            form: {
              cadastralForm: this.state.form.cadastralForm, // Pega o formulario da pagina anterior
              documentForm:  this.state.form.documentForm, // Pega o formulario da pagina anterior
              escolaridadeForm: escolaridadeForm // Pega o formulario da pagina atual
            }
          })
        }}
        //validate={this.validate}
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
                  customStyle={[styles.input, { width: wp('35%') }, styles.protectedInput]} />
                <Icon style={[styles.protectedInput, styles.birthdayIcon]} name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"} color="#9E9C9D" size={hp('5%')} />
              </View>
              <View style={styles.flexStartContainer}>
                <Field name="oab"
                  maskType="custom"
                  maskOptions={{ mask: '99999999' }}
                  component={MaskTextInput}
                  placeholder='OAB'
                  customStyle={[styles.input, { width: wp('42%') },]} />
              </View>
              <TouchableOpacity style={[styles.uploadDocument, {backgroundColor:this.state.buttonColor}]} onPress={this._pickDocument}>
                <Icon name={this.state.buttonIcon} size={hp('10%')} color='#fff' style={styles.uploadDocumentIcon} />
                <Text style={[styles.uploadDocumentText]}>Anexe o seu curriculo</Text>
              </TouchableOpacity>
              {this.state.fileName ?
                <Text style={styles.descriptionText}>{this.state.fileName}</Text> :
                null}
              <TouchableOpacity style={styles.buttonSignin} /*disabled={!isValid}*/ onPress={handleSubmit}>
                <Text style={styles.buttonSigninText}>PRÓXIMO</Text>
              </TouchableOpacity>
              <View style={styles.footer}>
                <ProgressBar Progress_Value={this.state.Progress_Value} />
              </View>
            </View>
          )}
      />)
  };
  _pickDocument = async () => {
    let arquivo = await DocumentPicker.getDocumentAsync({
      base64: true,
      copyToCacheDirectory: false,
      type: '*/*',
    });
    const file = await Expo.FileSystem.readAsStringAsync(arquivo.uri);
    const bytes = utf8.encode(file);
    const encoded = base64.encode(bytes);
    this.setState({ fileName: arquivo.name, fileContent: encoded, buttonColor: 'green', buttonIcon: 'ios-checkbox' });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E9ED',
    flex: 1,
  },
  footer: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  dataPickerContainer: {
    flexDirection: 'row',
    marginLeft: hp('2%'),
  },
  birthdayIcon: {
    height: hp('7%'),
    paddingRight: wp('5%'),
    marginTop: hp('3%'),
    textAlignVertical: 'center',
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
  },
  descriptionText: {
    alignSelf: 'center',
    textAlign: 'left',
    textAlignVertical: 'center',
  }
});

export default FormEscolaridade;