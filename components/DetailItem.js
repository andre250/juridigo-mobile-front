import React from "react";
import { Image, View, Text } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export class DetailItem extends React.Component {
    render() {
      return (
        <View
        style={{
            padding: hp('2%'),
            flexDirection: 'row'
          }}>
            <Image
            source={require('../assets/images/fb_icon.png')}
            style={{ width: wp('15%'), height: hp('5%'), margin: hp('1%')}}
            />
            <View>
                <Text style={{
                    fontSize: hp('2%'),
                    fontWeight: 'bold'
                }}>
                Forúm Trabalhista Barra Funda</Text>
                <Text style={{
                    fontSize: hp('2%')
                }}>
                Alguma descrição aqui</Text>
            </View>
        </View>
      );
    }
  }

export default DetailItem;