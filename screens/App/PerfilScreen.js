import React from 'react';
import { View, StyleSheet } from 'react-native'
import { LogoTitle } from '../../components/LogoTitle';
import { Profile } from '../../components/Profile';
import { Payments } from '../../components/Payments';

export default class PerfilScreen extends React.Component {
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
      <View style={styles.container}>
        <Profile />
        <Payments />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8E9ED"
  }
}); 
