import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from '../../components/ProgressBar'
import { TextTitle } from '../../components/TextTitle';

export class DocumentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Progress_Value: 0.50
    }
  }

  static navigationOptions = {
    header: (
      <TextTitle title='DADOS CADASTRAIS' showIcon={true}/>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.spaceCenterContainer}>
          <TouchableOpacity style={styles.imagePhoto} onPress={this._openCameraAsync}>
            <Text style={styles.imagePhotoText}>Tirar Foto</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.descriptionText}>Tire a foto de um documento (RG ou CNH)</Text>
        <View style={styles.spaceCenterContainer}>
          <TouchableOpacity style={styles.imagePhoto} onPress={this._openCameraAsync}>
            <Text style={styles.imagePhotoText}>Tirar Foto</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.descriptionText}>Tire uma foto sua segurando o documento</Text>
        <TouchableOpacity style={styles.buttonSignin} onPress={this._movePagesAsync}>
          <Text style={styles.buttonSigninText}>PRÓXIMO</Text>
        </TouchableOpacity>
        <ProgressBar Progress_Value={this.state.Progress_Value} />
      </View>
    );
  }
  _movePagesAsync = async () => {
    this.props.navigation.navigate('Education');
  };
  _openCameraAsync = async () => {
    this.props.navigation.navigate('Camera');
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
  spaceCenterContainer: {
    marginTop: hp('2%'),
    paddingLeft: hp('4%'),
    paddingRight: hp('4%'),
    width: wp('80%'),
    height: hp('25%'),
    borderRadius: 3,
    backgroundColor: '#2AA3D8',
  },
  imagePhoto: {
    backgroundColor: '#2AA3D8',
    height: hp('7%'),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  imagePhotoText: {
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: hp('2%'),
    fontWeight: '700'
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

export default DocumentScreen;