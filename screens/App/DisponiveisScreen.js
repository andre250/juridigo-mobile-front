import React from 'react';
import { ListaDisponiveis } from '../../components/ListaDisponiveis';
import { LogoTitle } from '../../components/LogoTitle';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: (
      <LogoTitle />
    )
  };

  componentDidMount() {
    console.log('renderizou');
  }

  componentWillMount() {
    console.log('renderizou2');
  }

  componentWillUpdate() {
    console.log('updatou');
  }

  render() {
    return (
      <ListaDisponiveis 
      nav={this.props.navigation}/>
    );
  }
}
