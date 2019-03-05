import React from "react";
import { View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import StepIndicator from 'react-native-step-indicator';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default class IntroductionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      us: '',
      ps: '',
      labels: ["Cadastral", "Documentos", "Escolaridade", "Pagamentos", "Aguardar Aprovação"],
      labelSize: 0,
      customStyles: {
        stepIndicatorSize: 40,
        currentStepIndicatorSize: 40,
        separatorStrokeWidth: 5,
        currentStepStrokeWidth: 5,
        stepStrokeCurrentColor: '#89B63F',
        stepStrokeWidth: 5,
        separatorStrokeFinishedWidth: 5,
        stepStrokeFinishedColor: '#89B63F',
        stepStrokeUnFinishedColor: '#89B63F',
        separatorFinishedColor: '#89B63F',
        separatorUnFinishedColor: '#89B63F',
        stepIndicatorFinishedColor: '#89B63F',
        stepIndicatorUnFinishedColor: '#89B63F',
        stepIndicatorCurrentColor: '#89B63F',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        labelColor: '#333333',
        labelSize: 14,
        currentStepLabelColor: '#333333',
      }
    }
  }

  static navigationOptions = {
    title: 'Aguardando aprovação',
  };

  render() {
    return (
      <ImageBackground source={require('../assets/images/bg3x.png')} style={styles.imageContainer}>
        <View style={styles.container}>
          <View style={{
            borderWidth: 2,
            borderColor: '#2980b6',
            alignItems: 'center',
            justifyContent: 'center',
            width: 75,
            height: 75,
            backgroundColor: '#ecf0f1',
            borderRadius: 100,
          }}>
            <Icon name={Platform.OS === "ios" ? "ios-clipboard" : "md-clipboard"} color="#2980b6" size={30} />
          </View>
          <Text style={{ textAlign: 'center', padding: hp('1%'), fontWeight: "bold", color: '#333333' }}>Você passará pelas seguintes etapas até se registrar para ser um JuridiGo.</Text>
          <StepIndicator
            customStyles={this.state.customStyles}
            direction={'vertical'}
            renderStepIndicator={this.renderStepIndicator}
            currentPosition={5}
            labels={this.state.labels}
            onPress={this.stepPressed} />
          <Text style={{ textAlign: 'center', padding: hp('1%'), fontWeight: "bold", color: '#333333', textDecorationLine: 'underline', fontSize: hp('2.5%') }}>Separe um documento com sua foto antes de começar.</Text>
          <TouchableOpacity style={styles.buttonSignup}
            onPress={() => { this.props.navigation.navigate('RegisterForm') }} >
            <Text style={styles.buttonSignupText}>Iniciar o Cadastro</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? '#ffffff' : '#ffffff',
    size: 25,
  }
  switch (position) {
    case 0: {
      iconConfig.name = 'library-books'
      break
    }
    case 1: {
      iconConfig.name = 'transfer-within-a-station'
      break
    }
    case 2: {
      iconConfig.name = 'location-on'
      break
    }
    case 3: {
      iconConfig.name = 'work'
      break
    }
    case 4: {
      iconConfig.name = 'payment'
      break
    }
    default: {
      break
    }
  }
  return iconConfig
}

renderStepIndicator = params => (
  <MaterialIcon {...this.getStepIndicatorIconConfig(params)} />
)

const styles = StyleSheet.create({
  imageContainer: {
    padding: hp('2%'),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  container: {
    padding: hp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20
  },
  buttonSignup: {
    paddingVertical: hp('2.2%'),
    marginBottom: hp('5%'),
    marginTop: hp('2.5%'),
    height: hp('8%'),
    width: wp('40%'),
    backgroundColor: '#2980b6',
    borderRadius: 5
  },
  buttonSignupText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700'
  },
  descriptionText: {
    color: '#333333',
    textAlign: 'justify',
    fontWeight: '700',
    fontSize: hp('2%'),
    marginTop: hp('10%')
  }
});
