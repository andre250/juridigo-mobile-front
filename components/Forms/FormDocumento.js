import { Field, Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
    }
  } 

  validate = ({ photo1, photo2 }) => {
    const errors = {};
    if (photo1 === undefined) {
      errors.photo1 = 'Obrigatório';
    } else if (photo1.trim() === '') {
      errors.photo1 = 'O campo não pode estar vazio.';
    }
    if (photo2 === undefined) {
      errors.photo2 = 'Obrigatório';
    } else if (photo2.trim() === '') {
      errors.photo2 = 'O campo não pode estar vazio.';
    }
    return errors;
  };

  callbackDocumentFunction = async (photo_document) => {
    this.setState({ colorDocument: 'green', photo_document: photo_document });
  };

  callbackFaceFunction = async (photoFace) => {
    this.setState({ colorFace: 'green', photo_face: photoFace });
  };

  _openCameraForDocumentAsync = async () => {
    this.props.navigation.navigate('Camera',{callback:this.callbackDocumentFunction.bind(this)});
  };

  _openCameraForFaceAsync = async () => {
    this.props.navigation.navigate('Camera',{callback:this.callbackFaceFunction.bind(this)});
  };


  render() {
    return (
      <Formik
        onSubmit={() => {
          documentForm = {
            foto_pessoa: this.state.photo_face,
            foto_document: this.state.photo_document
          }
          console.log(documentForm)
          this.props.navigation.navigate('Escolaridade')
        }}
        validate={this.validate}
        render={({
          handleSubmit,
          isValid,
        }) => (
            <View style={styles.container}>
              <View style={[styles.spaceCenterContainer, {backgroundColor:this.state.colorDocument}]}>
                <TouchableOpacity style={styles.imagePhoto} onPress={this._openCameraForDocumentAsync}>
                  <Image style={styles.imagePhotoImage}
                              source={this.state.photo_document ? {uri:this.state.photo_document} : require('../../assets/images/rg-exemplo.png')} />
                </TouchableOpacity>
              </View>
              <Text style={styles.descriptionText}>Tire a foto de um documento (RG ou CNH)</Text>
              <View style={[styles.spaceCenterContainerOther, {backgroundColor:this.state.colorFace}]}>
                <TouchableOpacity style={styles.imagePhoto} onPress={this._openCameraForFaceAsync}>
                  <Image style={styles.imagePhotoImagePerson}
                              source={this.state.photo_face ? {uri:this.state.photo_face} : require('../../assets/images/foto-exemplo.png')} />
                </TouchableOpacity>
              </View>
              <Text style={styles.descriptionText}>Tire uma foto sua segurando o documento</Text>
              <TouchableOpacity style={styles.buttonSignin} disabled={!isValid} onPress={handleSubmit}>
                <Text style={styles.buttonSigninText}>PRÓXIMO</Text>
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  footer: {
    alignSelf: 'flex-end',
    height: hp('7%')
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
    width: wp('45%'),
    height: hp('15%')
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
});

export default FormDocumento;