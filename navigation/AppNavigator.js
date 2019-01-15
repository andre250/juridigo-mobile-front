import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoading from './AuthLoading';

// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
// const AuthStack = createStackNavigator(
//   { 
//     // SignIn: SignInScreen 
//     Auth: AuthLoading,
//     App:MainTabNavigator
//   }
// );

// export default createAppContainer(createSwitchNavigator(
//   {
//     AuthLoading: AuthLoading,
//     App: MainTabNavigator,
//     // Auth: AuthStack,
//   },
//   {
//     initialRouteName: 'AuthLoading',
//   }
// ));

export default createAppContainer(createStackNavigator({ Root: AuthLoading }));