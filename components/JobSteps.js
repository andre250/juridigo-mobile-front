import React, { Component } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export class JobSteps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPosition: this.props.currentPosition,
      labels: this.props.labels,
      labelSize: 0,
      customStyles: {
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
    };
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
  stepPressed = (position) => {
    if (this.props.callBackFunction){
      this.props.callBackFunction()
      if (this.state.customStyles.labelSize === 0){
        this.setState({
        customStyles: {
          ...this.state.customStyles,
          labelSize: hp('1.7%')
        }
      })} 
      else {
        this.setState({
          customStyles: {
            ...this.state.customStyles,
            labelSize: 0
          }
        })
      }
    }    
  }

  render() {
    return (
      <StepIndicator
        customStyles={this.state.customStyles}
        renderStepIndicator={this.renderStepIndicator}
        currentPosition={this.state.currentPosition}
        labels={this.state.labels}
        onPress={this.stepPressed}
      />
    );
  }
}

export default JobSteps;