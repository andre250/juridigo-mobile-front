import { Field, Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from '../ProgressBar'

export class FormDocumento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Progress_Value: 0.50,
      photo_face: null,
      photoFace: null,
      photo_document: null,
      colorDocument:'#2AA3D8',
      colorFace:'#2AA3D8',
      buttonSignInColor: 'grey',
      isValid: false,
      form: this.props.navigation.state.params.form
    }
  }

  _setNextButton = async (status) => {
    if (status) {
      this.setState({ buttonSignInColor: '#2AA3D8', isValid: true });

    } else {
      this.setState({ buttonSignInColor: 'grey', isValid: false });
    }
  };

  callbackDocumentFunction = async (photo_document, location) => {
    this.setState({ colorDocument: 'green', photo_document: photo_document, photoDocumentLocation: location });
    if (this.state.photo_face != undefined && this.state.photo_document != undefined) {
      this._setNextButton(true);
    } else {
      this._setNextButton(false);
    }
  };

  callbackFaceFunction = async (photoFace, location) => {
    this.setState({ colorFace: 'green', photo_face: photoFace, photoFaceLocation: location });
    if (this.state.photo_face != undefined && this.state.photo_document != undefined) {
      this._setNextButton(true);
    } else {
      this._setNextButton(false);
    }
  };

  _openCameraForDocumentAsync = async () => {
    this.props.navigation.navigate('Camera',{callback:this.callbackDocumentFunction.bind(this)});
  };

  _openCameraForFaceAsync = async () => {
    this.props.navigation.navigate('Camera',{callback:this.callbackFaceFunction.bind(this)});
  };


  render() {
    return (
      <ScrollView>
      <Formik
        onSubmit={() => {
          documentForm = {
            foto_pessoa: this.state.photo_face,
            foto_document: this.state.photo_document
          }
          // Persiste os formularios para a próxima página
          this.props.navigation.navigate('Escolaridade', {
            form: {
              cadastralForm: this.state.form.cadastralForm, // Pega o formulario da pagina anterior
              documentForm:  documentForm // Pega o formulario da pagina atual
            }
          })
        }}
        //validate={this.validate}
        render={({
          handleSubmit,
          isValid,
        }) => (
            <View style={styles.container}>
              <View style={[styles.spaceCenterContainer, {backgroundColor:this.state.colorDocument}]}>
                <TouchableOpacity style={styles.imagePhoto} onPress={this._openCameraForDocumentAsync}>
                  <Image style={styles.imagePhotoImage}
                              source={this.state.photoDocumentLocation ? {uri:this.state.photoDocumentLocation} : require('../../assets/images/rg-exemplo.png')} />
                </TouchableOpacity>
              </View>
              <Text style={styles.descriptionText}>Tire a foto de um documento (RG ou CNH)</Text>
              <View style={[styles.spaceCenterContainerOther, {backgroundColor:this.state.colorFace}]}>
                <TouchableOpacity style={styles.imagePhoto} onPress={this._openCameraForFaceAsync}>
                  <Image style={styles.imagePhotoImagePerson}
                              source={this.state.photoFaceLocation ? {uri:this.state.photoFaceLocation} : require('../../assets/images/foto-exemplo.png')} />
                </TouchableOpacity>
              </View>
              <Text style={styles.descriptionText}>Tire uma foto sua segurando o documento</Text>
              <TouchableOpacity style={[styles.buttonSignin, 
                {backgroundColor:this.state.buttonSignInColor}]} 
                /*disabled={!this.state.isValid}*/ onPress={handleSubmit}>
                <Text style={styles.buttonSigninText}>PRÓXIMO</Text>
              </TouchableOpacity>
            </View>
          )}
      />
      <View style={styles.footer}>
        <ProgressBar Progress_Value={this.state.Progress_Value} />
      </View>
      </ScrollView>)
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E9ED',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    alignSelf: 'flex-end',
    height: hp('8%')
  },
  spaceCenterContainer: {
    marginTop: hp('2%'),
    width: wp('80%'),
    height: hp('25%'),
    borderRadius: 3,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  spaceCenterContainerOther: {
    marginTop: hp('2%'),
    width: wp('80%'),
    height: hp('25%'),
    borderRadius: 3,
    backgroundColor: '#2AA3D8',
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  imagePhoto: {
    backgroundColor: '#2AA3D8',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  imagePhotoImage: {
    alignSelf: 'center',
    width: wp('35%'),
    height: hp('11%')
  },
  imagePhotoImagePerson: {
    alignSelf: 'center',
    width: wp('39%'),
    height: hp('23%')
  },
  descriptionText: {
    alignSelf: 'center',
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  buttonSignin: {
    marginTop: hp('4%'),
    marginBottom: hp('4%'),
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
});

export default FormDocumento;