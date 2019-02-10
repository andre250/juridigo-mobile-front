import React, { Component } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const labels = ["Contestação","Saída","Chegada","Audiência","Pagamento"]

const customStyles = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 60,
  separatorStrokeWidth: 5,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#E2D249',
  stepStrokeWidth: 5,
  separatorStrokeFinishedWidth: 5,
  stepStrokeFinishedColor: '#89B63F',
  stepStrokeUnFinishedColor: '#7A7A7A',
  separatorFinishedColor: '#89B63F',
  separatorUnFinishedColor: '#7A7A7A',
  stepIndicatorFinishedColor: '#89B63F',
  stepIndicatorUnFinishedColor: '#7A7A7A',
  stepIndicatorCurrentColor: '#E2D249',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#89B63F',
  stepIndicatorLabelUnFinishedColor: '#7A7A7A',
  labelColor: 'green',
  labelSize: 0,
  currentStepLabelColor: '#fe7013'
}

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'feed',
    color: stepStatus === 'finished' ? '#ffffff' : '#ffffff',
    size:  25,
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

export class JobSteps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPosition: 3,
    };
  }
  renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  )

  render() {
    return (
      <StepIndicator
          customStyles={customStyles}
          renderStepIndicator={this.renderStepIndicator}
          currentPosition={this.state.currentPosition}
          labels={labels}
        />
    );
  }
}

export default JobSteps;