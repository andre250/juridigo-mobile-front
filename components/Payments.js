import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, ScrollView, AsyncStorage } from "react-native";
import { List, ListItem } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Payment from '../http_factory/payment';
import DataFormat from './DataFormat';
import { NavigationEvents } from "react-navigation";

export class Payments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  _loadUserPayment = async function () {
    const userID = await AsyncStorage.getItem("userID");
    const userToken = await AsyncStorage.getItem("userToken");
    try {
      const data = await Payment.getUserPayment(userID, userToken);
      this.setState({ data: data });
    } catch (err) {
    }
  }

  componentDidMount() {
    this._loadUserPayment();
  }

  renderItem = ({ item }) => (
    <ListItem hideChevron title={
      <View style={styles.container}>
        <DataFormat timestamp={item.dataConclusao} />
        <Text style={styles.normalLabel}>Preposto</Text>
        <Text style={styles.normalLabel}>{"R$" + item.valor}</Text>
        <Text style={styles.styleLabel}>{item.status == "0" ? "À receber" : "Recebido"}</Text>
      </View>
    } />
  );
  notFound = () => {
    return (<View >
      <Text style={styles.Text}>Nenhum pagamento associado a conta.</Text>
    </View>)
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <NavigationEvents onWillFocus={() => {
          this._loadUserPayment();
        }} />
          <FlatList 
            data={this.state.data}
            renderItem={this.renderItem}
            ListEmptyComponent={this.notFound}
            keyExtractor={item => item.propostaId}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#E8E9ED",
    height: "100%",
    justifyContent: 'center',
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
  },
  Text: {
    color: "#9F9F9F",
    fontWeight: 'bold',
    flexDirection: 'row',
    padding: hp('1%'),
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default Payments;