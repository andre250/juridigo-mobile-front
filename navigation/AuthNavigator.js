import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/Auth/LoginScreen'
import AuthLoadingScreen from '../screens/Auth/AuthLoadingScreen'
import FormularioScreen from '../screens/FormularioScreen'

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

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: LoginScreen,
    RegisterForm: FormularioScreen,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);