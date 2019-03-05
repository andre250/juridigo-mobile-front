import React from 'react';
import { ListaDisponiveis } from '../../components/ListaDisponiveis';
import { LogoTitle } from '../../components/LogoTitle';
import { View } from "react-native";

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: (
      <LogoTitle />
    )
  };

  render() {
    return (
      <ListaDisponiveis nav={this.props.navigation} />
    );
  }
}
