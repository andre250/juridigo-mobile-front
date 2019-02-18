import React from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Picker } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from '../../components/ProgressBar'
import { TextTitle } from '../../components/TextTitle';
import { CustomDatePicker } from '../../components/CustomDatePicker'
import { DocumentPicker } from 'expo';
import Icons from 'react-native-vector-icons/Ionicons';

export class EducationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Progress_Value: 0.75,
      date: null
    }
  }

  static navigationOptions = {
    header: (
      <TextTitle title='DADOS PROFISSIONAIS' showIcon={true} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.spaceAroundContainer}>
          <Picker onValueChange={hand => {console.log('changed to', hand);}} 
            style={[styles.input, styles.protectedInput, styles.sixtySizeInput]} mode="dropdown">
            <Picker.Item value='' label='Escolaridade' />
            <Picker.Item label="Ensino Médio" value="ensino_medio" />
            <Picker.Item label="Ensino Superior" value="ensino_superior" />
            <Picker.Item label="Mestrado" value="mestrado" />
            <Picker.Item label="Doutorado" value="doutorado" />
            <Picker.Item label="Pós Doutorado" value="pos_doutorado" />
          </Picker>
        </View>
        <View style={styles.spaceAroundContainer}>
          <TextInput placeholder='Instituição' style={[styles.input, styles.twoColumnsInput]} />
        </View>
        <View style={styles.customDataPickerContainer}>
          <CustomDatePicker placeHolder='Ano conclusão' date={this.state.date} onDateChange={(date) => { this.setState({ date: date }) }} />
        </View>
        <View style={styles.flexStartContainer}>
          <TextInput placeholder='OAB' style={[styles.input, styles.sixtySizeInput]} />
        </View>
        <TouchableOpacity style={styles.uploadDocument} onPress={this._pickDocument}>
          <Icons name={"ios-paper"} size={hp('8%')} color='#fff' style={styles.uploadDocumentIcon} />
          <Text style={styles.uploadDocumentText}>Anexe o seu curriculo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSignin} onPress={this._movePagesAsync}>
          <Text style={styles.buttonSigninText}>PRÓXIMO</Text>
        </TouchableOpacity>
        <ProgressBar Progress_Value={this.state.Progress_Value} />
      </View>
    );
  }
  _movePagesAsync = async () => {
    this.props.navigation.navigate('Payment');
  };
  _pickDocument = async () => {
    let arquivo = await DocumentPicker.getDocumentAsync({});
    alert('O seguinte documento foi escolhido ' + arquivo.uri);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8E9ED',
    flex: 1,
  },
  spaceAroundContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: hp('2%'),
    paddingRight: hp('2%')
  },
  customDataPickerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: hp('3%'),
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
    marginRight: hp('2%'),
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
    marginTop: hp('5%'),
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

export default EducationScreen;