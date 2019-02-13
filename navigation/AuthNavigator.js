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

const FormStack = createStackNavigator(
    { 
      Cadastral: FormularioScreen 
    }
  );

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: LoginScreen,
    RegisterForm: FormStack,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);