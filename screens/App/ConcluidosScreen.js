import React from 'react';
import { ListaConcluidos } from '../../components/ListaConcluidos';
import { LogoTitle } from '../../components/LogoTitle';

export default class LinksScreen extends React.Component {

  static navigationOptions = {
    header: (
      <LogoTitle />
    )
  };

  render() {
    return (
      <ListaConcluidos
        nav={this.props.navigation} />
    );
  }
}