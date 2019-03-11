import React from 'react';
import { ListaAceitos } from '../../components/ListaAceitos';
import { LogoTitle } from '../../components/LogoTitle';

export default class AceitosScreen extends React.Component {
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
      <ListaAceitos
        nav={this.props.navigation} />
    );
  }
}