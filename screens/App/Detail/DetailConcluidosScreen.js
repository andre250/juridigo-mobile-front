import React from 'react';

import { Text, View } from 'react-native';

export default class DetailConcluidosScreen extends React.Component {
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Detalhes desse item!</Text>
      </View>
    );
  }
}
