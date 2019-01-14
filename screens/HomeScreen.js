import React from 'react';
import { StyleSheet } from 'react-native';
import { ListaDisponiveis } from '../components/ListaDisponiveis';

export default class LinksScreen extends React.Component {
  
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
      <ListaDisponiveis></ListaDisponiveis>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'grey',
  },
});
