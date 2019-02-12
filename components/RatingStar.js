import React from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native"

export class RatingStar extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Icon
          name={this.props.name}
          size={this.props.size}
          color={this.props.color} />
        <Text style={styles.ratingLabel}>{this.props.rating}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems:'center',
    flex: 1
  },
  ratingLabel: {
    color: "#3D3D3D",
    position: "absolute",
    alignItems:'center',
    alignSelf:'center',
    fontWeight: 'bold'
  },
  ratingStar: {
    alignItems:'center',
    alignSelf:'center'
  }
});

export default RatingStar