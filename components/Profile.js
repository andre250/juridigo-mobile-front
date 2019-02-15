import React from "react";
import { Image, View, Text, StyleSheet, AsyncStorage, ActivityIndicator } from "react-native";
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
        {this.state.name != ""
          ? <View style={styles.container}>
            <Avatar xlarge rounded title={this.state.sg} />
            <Text style={styles.textName}>{this.state.name}</Text>
            <Text style={styles.textInfo}>{this.state.phone}</Text>
            <Text style={styles.textInfo}>{this.state.email}</Text>
          </View>
          : <ActivityIndicator size="large" color="#13438F" />}
        <Text style={styles.textStatus}>Status do recebimento</Text>
        <Text>────────────────</Text>
      </View>
    );
  }

  componentDidMount() {
    this.makeRemoteRequest()
  }

  _createTagName = function(fullName) {
    const splitName = fullName.split(" ")
    const first = splitName[0];
    const second = splitName[1];
 
    if (second) {
      return `${first.substr(0, 1).toUpperCase()}${second.substr(0, 1).toUpperCase()}`
    }else {
      return `${first.substr(0, 1).toUpperCase()}${first.substr(1, 1).toUpperCase()}`
    }
  }

  makeRemoteRequest = async () => {
    const userName = await AsyncStorage.getItem("userName");
    const userId = await AsyncStorage.getItem("userID");
    const userToken = await AsyncStorage.getItem("userToken");

    const userInfo = await User.getUserInfo(userId, userToken)


    this.setState({
      name: userName,
      phone: `(${userInfo.cadastrais.telefone.substr(0, 2)}) ${userInfo.cadastrais.telefone.substr(2, 9)}`,
      email: userInfo.cadastrais.email,
      sg: this._createTagName(userName)
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