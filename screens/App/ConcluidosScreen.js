import React from 'react';
import { ListaConcluidos } from '../../components/ListaConcluidos';
import { LogoTitle } from '../../components/LogoTitle';

export default class LinksScreen extends React.Component {
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
      <ListaConcluidos
        nav={this.props.navigation} />
    );
  }
}