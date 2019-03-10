import React from "react";
import { Image, View, TouchableOpacity, AsyncStorage, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Ionicons"

export class LogoTitle extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          paddingVertical: hp('1%'),
          paddingHorizontal: wp('5%'),
          backgroundColor: "#2AA3D8",
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={this._logout}>
          <Icon 
          name={"ios-log-out"} 
          color= "white" 
          size={hp('5%')} />
        </TouchableOpacity>
        <Image
          source={require('../assets/images/logo_final.png')}
          style={{ marginLeft:wp('6%') ,width: wp('65%'), height: hp('10%') }}
        />
      </View>
    );
  }

  _logout = async () => {
    Alert.alert(
      'Sair da sua conta',
      'Você deseja realmente sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {text: 'Sair', onPress: async () => {
          await AsyncStorage.setItem('userToken', '');
          this.props.navigation.navigate('Auth')
        }},
      ],
      {cancelable: true},
    );
    
  }
}

export default LogoTitle;