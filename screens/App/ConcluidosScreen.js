import React from 'react';
import { StyleSheet } from 'react-native';
import { ListaConcluidos } from '../../components/ListaConcluidos';

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
      <ListaConcluidos
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
