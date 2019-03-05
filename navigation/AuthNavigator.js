import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import FormNavigator from './FormNavigator';
import LoginScreen from '../screens/Auth/LoginScreen'
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen'
import React from 'react';
import { TextTitle } from '../components/TextTitle';
import WaitingScreen from '../screens/WaitingConfirmation';
import IntroductionScreen from '../screens/IntroductionScreen';

const AppStack = createStackNavigator(
    { 
      Main: MainTabNavigator 
    },
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
     }
  );

const FormStack = createStackNavigator(
    { 
      Main: FormNavigator
    }
  );

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: LoginScreen,
    RegisterForm: FormStack,
    App: AppStack,
    Waiting: WaitingScreen,
    Introduction: IntroductionScreen
  },
  {
    initialRouteName: 'AuthLoading',
  }
);