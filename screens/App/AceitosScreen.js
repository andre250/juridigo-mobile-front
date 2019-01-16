import React from 'react';
import { StyleSheet } from 'react-native';
import { ListaAceitos } from '../../components/ListaAceitos';

export default class AceitosScreen extends React.Component {
  
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
      <ListaAceitos 
      nav={this.props.navigation}/>
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
