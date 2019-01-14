import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';


const AuthLoadingStack = createStackNavigator({
    AuthLoading: AuthLoadingScreen,
  });
  
  AuthLoadingStack.navigationOptions = {
    tabBarLabel: 'Auth',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
  };

export default AuthLoadingStack;