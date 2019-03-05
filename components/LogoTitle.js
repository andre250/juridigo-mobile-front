import React from "react";
import { Image, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export class LogoTitle extends React.Component {
  render() {
    return (
      <View
        style={{
          paddingVertical: 20,
          backgroundColor: "#2AA3D8",
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Image
          source={require('../assets/images/logo_final.png')}
          style={{ width: wp('65%'), height: hp('10%') }}
        />
      </View>
    );
  }
}

export default LogoTitle;