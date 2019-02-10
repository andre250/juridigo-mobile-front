import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, ScrollView } from "react-native";
import { List, ListItem } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export class Payments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { key: '1', date: "13/01", label: "Audiencia", value: "500,00", status: "A receber" },
        { key: '2', date: "19/01", label: "Correspondencia", value: "250,00", status: "A receber" },
        { key: '3', date: "19/01", label: "Correspondencia", value: "250,00", status: "A receber" },
        { key: '4', date: "19/01", label: "Correspondencia", value: "250,00", status: "A receber" },
        { key: '5', date: "19/01", label: "Correspondencia", value: "250,00", status: "A receber" }
      ]
    };
  }

  renderItem = ({ item }) => (
    <ListItem hideChevron title={
      <View style={styles.container}>
        <Text style={styles.normalLabel}>{item.date}</Text>
        <Text style={styles.normalLabel}>{item.label}</Text>
        <Text style={styles.normalLabel}>{item.value}</Text>
        <Text style={styles.styleLabel}>{item.status}</Text>
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
            keyExtractor={item => item.key}
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
    width: wp('25%')
  },
  styleLabel: {
    color: "green",
    textAlign: "center",
    padding: hp("1%"),
    fontSize: hp("2%"),
  }
});

export default Payments;