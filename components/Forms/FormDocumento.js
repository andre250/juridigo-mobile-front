import { Field, Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import PlainTextInput from './Elements/PlainTextInput';
import MaskTextInput from './Elements/MaskTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from '../ProgressBar'
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from 'react-native';
import { Camera, Permissions } from 'expo';

const state = {
  date: null,
  Progress_Value: 0.50,
}

const validate = ({ photo1, photo2 }) => {
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

const FormDocumento = (props) => (
  <Formik
    onSubmit={({ foto_pessoa, foto_document }) => {
      documentForm = {
        foto_pessoa: foto_pessoa,
        foto_document: foto_document
      }
      props.navigation.navigate('Escolaridade')
    }}
    //validate={validate}
    render={({
      handleSubmit,
      isValid,
    }) => (
        <View style={styles.container}>
          <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} />
          <View style={styles.spaceCenterContainer}>
            <TouchableOpacity style={styles.imagePhoto} onPress={this._openCameraAsync}>
              <Image style={styles.imagePhotoImage} 
                source={require('../../assets/images/rg-exemplo.png')} />
            </TouchableOpacity>
          </View>
          <Text style={styles.descriptionText}>Tire a foto de um documento (RG ou CNH)</Text>
          <View style={styles.spaceCenterContainerOther}>
            <TouchableOpacity style={styles.imagePhoto} onPress={this._openCameraAsync}>
            <Image style={styles.imagePhotoImagePerson} 
                source={require('../../assets/images/foto-exemplo.png')} />
            </TouchableOpacity>
          </View>
          <Text style={styles.descriptionText}>Tire uma foto sua segurando o documento</Text>
          <TouchableOpacity style={styles.buttonSignin} /*disabled={!isValid}*/ onPress={handleSubmit}>
            <Text style={styles.buttonSigninText}>PRÓXIMO</Text>
          </TouchableOpacity>
          <ProgressBar Progress_Value={state.Progress_Value} />
        </View>
      )}
  />
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E9ED',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  spaceCenterContainer: {
    marginTop: hp('2%'),
    width: wp('80%'),
    height: hp('25%'),
    borderRadius: 3,
    backgroundColor: '#2AA3D8',
    alignItems:'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  spaceCenterContainerOther: {
    marginTop: hp('2%'),
    width: wp('80%'),
    height: hp('25%'),
    borderRadius: 3,
    backgroundColor: '#2AA3D8',
    alignItems:'flex-end',
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