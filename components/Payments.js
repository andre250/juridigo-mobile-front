import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, ScrollView, AsyncStorage } from "react-native";
import { List, ListItem } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Payment from '../http_factory/payment';
import DataFormat from './DataFormat';

export class Payments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  _loadUserPayment = async function() {
    const userID = await AsyncStorage.getItem("userID");
    const userToken = await AsyncStorage.getItem("userToken");
    try{
      const data = await Payment.getUserPayment(userID, userToken);
      this.setState({ data: data });
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this._loadUserPayment(); 
  }

  renderItem = ({ item }) => (
    <ListItem hideChevron title={
      <View style={styles.container}>
        <DataFormat timestamp={item.dataConclusao}/>
        <Text style={styles.normalLabel}>Preposto</Text>
        <Text style={styles.normalLabel}>{"R$" + item.valor}</Text>
        <Text style={styles.styleLabel}>{item.status == "0" ? "À receber" : "Recebido"}</Text>
      </View>
    } />
  );

  
  render() {
    return (
      <ScrollView style={{ height: "100%" }}>
        <List style={styles.listContainer} containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList style={styles.listContainer}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.propostaId}
          />
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#E8E9ED",
    height: hp("100%")
  },
  container: {
    backgroundColor: "#E8E9ED",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  normalLabel: {
    color: "#3a3a3a",
    textAlign: "center",
    fontSize: hp("2%"),
    padding: hp("1%"),
    width: wp('22%')
  },
  styleLabel: {
    color: "green",
    textAlign: "center",
    padding: hp("1%"),
    fontSize: hp("2%"),
  }
});

export default Payments;