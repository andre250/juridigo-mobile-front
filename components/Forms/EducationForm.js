import React from 'react';
import { TextInput, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ProgressBar} from '../ProgressBar'
import { Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import { Camera, Permissions } from 'expo';

class EducationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Progress_Value: 0.75,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flexStartContainer}>
          <TextInput placeholder='Escolaridade' style={[styles.input, styles.sixtySizeInput]} />
        </View>
        <View style={styles.spaceAroundContainer}>
          <TextInput placeholder='Instituição' style={[styles.input, styles.twoColumnsInput]} />
        </View>
        <View style={styles.flexStartContainer}>
          <TextInput placeholderTextColor={'#787974'} placeholder='Ano conclusão' style={[styles.input, styles.sixtySizeInput, styles.protectedInput]} />
          <Icon style={styles.calendarIcon} name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"} color="#9F9F9F" size={hp('5%')} />
        </View>
        <View style={styles.flexStartContainer}>
          <TextInput placeholder='OAB' style={[styles.input, styles.sixtySizeInput]} />
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
  },
  spaceAroundContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%')
  },
  flexStartContainer: {
    flex: 1,
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
    height: hp('9%'),
    padding: hp('1%'),
    marginTop: hp('4%'),
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
});

export default EducationForm;