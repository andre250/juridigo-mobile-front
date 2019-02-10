import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux'
import store from './store'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    teste: 'Aqui'
  }; 

  render() {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
