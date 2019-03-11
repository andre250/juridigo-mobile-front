import React from 'react';
import { ListaDisponiveis } from '../../components/ListaDisponiveis';
import { LogoTitle } from '../../components/LogoTitle';
import { View } from "react-native";
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({navigation}) => {
    return {
      header: <LogoTitle navigation={navigation} />
    }
  };

  render() {
    return (
      <ListaDisponiveis nav={this.props.navigation} />
    );
  }
}
