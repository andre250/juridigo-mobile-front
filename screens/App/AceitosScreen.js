import React from 'react';
import { ListaAceitos } from '../../components/ListaAceitos';
import { LogoTitle } from '../../components/LogoTitle';

export default class AceitosScreen extends React.Component {

  static navigationOptions = {
    header: (
      <LogoTitle />
    )
  };

  render() {
    return (
      <ListaAceitos
        nav={this.props.navigation} />
    );
  }
}