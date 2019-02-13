import React from "react";
import { Image, View, Text, StyleSheet, AsyncStorage } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-elements';
import User from '../http_factory/user';

export class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      phone: "",
      email: "",
      sg: "",
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Avatar xlarge rounded
          source={{
            uri:
              'https://i.imgur.com/FPEwMuG.jpg',
          }} />
        <Text style={styles.textName}>{this.state.name ? this.state.name : "Carregando..."}</Text>
        <Text style={styles.textInfo}>{this.state.phone}</Text>
        <Text style={styles.textInfo}>{this.state.email}</Text>
        <Text style={styles.textStatus}>Status do recebimento</Text>
        <Text>────────────────</Text>
      </View>
    );
  }

  componentDidMount() {
    this.makeRemoteRequest()
  }

  makeRemoteRequest = async () => {
    const userName = await AsyncStorage.getItem("userName");
    const userId = await AsyncStorage.getItem("userID");
    const userToken = await AsyncStorage.getItem("userToken");

    const userInfo = await User.getUserInfo(userId, userToken)

    const sgParts = userName.split(" ");

    this.setState({
      name: userName,
      phone: `(${userInfo.cadastrais.telefone.substr(0, 2)}) ${userInfo.cadastrais.telefone.substr(2, 9)}`,
      email: userInfo.cadastrais.email,
      sg: `${sgParts[0].substr(0, 1)}${sgParts[1].substr(0, 1)}`
    })
  }

}

const styles = StyleSheet.create({
  container: {
    padding: hp('2%'),
    backgroundColor: "#E8E9ED",
    alignItems: 'center'
  },
  textName: {
    padding: hp('1%'),
    fontSize: hp("3%"),
    fontWeight: "bold"
  },
  textInfo: {
    fontSize: hp("2%"),
  },
  textStatus: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    color: "#333",
    marginTop: hp('5%'),
  }
});

export default Profile;