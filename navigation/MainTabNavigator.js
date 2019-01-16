import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DisponivelScreen from '../screens/App/DisponiveisScreen';
import DetailDisponivelScreen from '../screens/App/Detail/DetailDisponiveisScreen';
import AceitosScreen from '../screens/App/AceitosScreen';
import DetailAceitosScreen from '../screens/App/Detail/DetailAceitosScreen';
import ConcluidosScreen from '../screens/App/ConcluidosScreen';
import DetailConcluidosScreen from '../screens/App/Detail/DetailConcluidosScreen';
import PerfilScreen from '../screens/App/PerfilScreen';




const DisponivelStack = createStackNavigator({
  Disponivel: DisponivelScreen,
  DetailDisponivel: DetailDisponivelScreen
});

DisponivelStack.navigationOptions = {
  tabBarLabel: 'Disponíveis',
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

const AceitosStack = createStackNavigator({
  Aceitos: AceitosScreen,
  DetailAceitos: DetailAceitosScreen
});

AceitosStack.navigationOptions = {
  tabBarLabel: 'Aceitos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const ConcluidosStack = createStackNavigator({
  Concluidos: ConcluidosScreen,
  DetailConcluidos: DetailConcluidosScreen
});

ConcluidosStack.navigationOptions = {
  tabBarLabel: 'Concluídos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const PerfilStack = createStackNavigator({
  Perfil: PerfilScreen,
});

PerfilStack.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  DisponivelStack,
  AceitosStack,
  ConcluidosStack,
  PerfilStack,
});
