import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import AuthNavigator from './AuthNavigator';

const MainNavigator = 
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
  );

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;