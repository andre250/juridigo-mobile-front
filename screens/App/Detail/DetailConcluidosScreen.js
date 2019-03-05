import React from 'react';

import { Text, View } from 'react-native';

export default class DetailConcluidosScreen extends React.Component {

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Detalhes desse item!</Text>
      </View>
    );
  }
}
