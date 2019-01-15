import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import AuthNavigator from './AuthNavigator';

export default createAppContainer(
  createStackNavigator(
    { 
      Root: AuthNavigator 
    },
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
     }
  )
);