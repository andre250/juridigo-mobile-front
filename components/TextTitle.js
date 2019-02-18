import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CustomBackButton } from './CustomBackButton'

export class TextTitle extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
      return (
        <View style={styles.container}>
          {this.props.showIcon ? (<CustomBackButton />) : null}
          <Text style={styles.dateText}>{this.props.title}</Text>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 20,
      backgroundColor: "#2AA3D8",
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop:hp('5%')
    },
    dateText: {
      color: '#FFFFFF',
      alignSelf:'center',
      height:hp('8%'),
      fontSize:hp('3%'),
      textAlign:'center',
      textAlignVertical:'center'
    }
  });

export default TextTitle;