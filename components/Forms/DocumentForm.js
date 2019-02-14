import React from 'react';
import { TextInput, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ProgressBar} from '../ProgressBar'
import { Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import { Camera, Permissions } from 'expo';

class DocumentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Progress_Value: 0.50,
      type: Camera.Constants.Type.back,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.spaceCenterContainer}>
          <Camera type={this.state.type}></Camera>
          <Text>Tire a foto de um documento (RG ou CNH)</Text>
        </View>
        <View style={styles.spaceCenterContainer}>
          <Camera type={this.state.type}></Camera>
          <Text>Tire uma foto sua segurando o documento</Text>
        </View>
        <TouchableOpacity style={styles.buttonSignin}>
          <Text style={styles.buttonSigninText}>PRÓXIMO</Text>
        </TouchableOpacity>
        <ProgressBar Progress_Value={this.state.Progress_Value}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E9ED',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  spaceCenterContainer: {
    paddingLeft: hp('2%'),
    paddingRight: hp('2%'),
    width: wp('80%'),
    height: hp('20%'),
    marginTop: hp('5%'),
    marginBottom: hp('5%'),
    backgroundColor: '#2AA3D8'
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
  }
});

export default DocumentForm;