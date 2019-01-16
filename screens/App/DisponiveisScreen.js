import React from 'react';
import { ListaDisponiveis } from '../../components/ListaDisponiveis';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'JuridiGo',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  render() {
    return (
      <ListaDisponiveis 
      nav={this.props.navigation}/>
    );
  }
}
