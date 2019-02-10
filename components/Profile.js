import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Avatar } from 'react-native-elements';

export class Profile extends React.Component {
    render() {
      return (
        <View style={styles.container}>
            <Avatar xlarge title="AP" rounded/>
            <Text style={styles.textName}>André Petridis</Text>
            <Text style={styles.textInfo}>(11) 998409161</Text>
            <Text style={styles.textInfo}>andre.petridis@juridigo.com.br</Text>
            <Text style={styles.textStatus}>Status do recebimento</Text>
            <Text>────────────────</Text>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    padding:hp('2%'),
    backgroundColor: "#E8E9ED",
    alignItems: 'center'
    },
  textName: {
    padding:hp('1%'),
    fontSize:hp("3%"),
    fontWeight: "bold"
  },
  textInfo: {
    fontSize:hp("2%"),
  },
  textStatus: {
    fontSize:hp("2%"),
    fontWeight: "bold",
    color: "#333",
    marginTop:hp('5%'),
  }
  }); 

export default Profile;