import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet, AsyncStorage } from "react-native";
import { ListItem } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Ionicons"
import { Platform } from 'react-native';
import JobSteps from "./JobSteps";
import Proposal from "../http_factory/proposal";
import DataFormat from "./DataFormat";
import Distance from "./Distance";

export class ListaAceitos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      userID: "0",
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      currentPosition: 0
    };
  }

  componentDidMount() {
    this.nav = this.props.nav
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    this.setState({ loading: true });
    this.state.userID = await AsyncStorage.getItem("userID");
    const userToken = await AsyncStorage.getItem("userToken");
    const userLatitude = await AsyncStorage.getItem('userLatitude');
    const userLongitude = await AsyncStorage.getItem('userLongitude');

    this.setState({
      latitude: userLatitude,
      longitude: userLongitude
    });

    try {
      const data = await Proposal.getUserProposal(this.state.userID, userToken)
      this.setState({ 
        loading: false,
        data: data 
      });
    } catch (error) {
      this.setState({ 
        loading: false
      });
    }
  };

  handleRefresh = () => {
    this.makeRemoteRequest();
  };

  handleLoadMore = () => {
    this.makeRemoteRequest();
  };

  renderItem = ({ item }) => (
    <ListItem
      roundAvatar
      hideChevron
      title={
        <View style={styles.listItemContainer}>
          <Text style={styles.labelText}>{item.rotulo}</Text>
          <View style={styles.jobStepContainer}>
            <JobSteps />
          </View>
          <View style={styles.listItemLowerContainer}>
            <View style={styles.infoContainer}>
              <Icon name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"} color="#9F9F9F" size={25} />
              <DataFormat timestamp={item.prazo} />
              {/* <Text style={styles.infoLabel}>14h - 11/ 02</Text> */}
            </View>
            <View style={styles.infoContainer}>
              <Icon name={Platform.OS === "ios" ? "ios-wallet" : "md-wallet"} color="#9F9F9F" size={25} />
              <Text style={styles.infoLabel}>R$ {item.valor}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon name={Platform.OS === "ios" ? "ios-pin" : "md-pin"} color="#9F9F9F" size={25} />
              <Distance 
                uLat={this.state.latitude}
                uLong={this.state.longitude}
                tLat={item.latitude}
                tLong={item.longitude}/>
            </View>
          </View>
        </View>}
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={() => this.nav.navigate('DetailAceitos', {
        item: item
      })}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.idTrabalho}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8E9ED",
    height: "100%",
    justifyContent: 'center',
  },
  jobStepContainer: {
    backgroundColor: "#fff",
    paddingTop: hp('1%'),
    paddingLeft: hp('1%'),
    paddingRight: hp('1%'),
  },
  labelText: {
    color: "white",
    textAlign: "center",
    height: hp('5%'),
    fontWeight: 'bold',
    fontSize: hp("2%"),
    alignSelf: "center",
    textAlignVertical: "center"
  },
  listItemContainer: {
    backgroundColor: "#13438F",
    borderRadius: 7,
  },
  listItemLowerContainer: {
    backgroundColor: "#fff",
    height: hp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  infoContainer: {
    flexDirection: 'row',
    padding: hp('1%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: "#9F9F9F",
    fontWeight: 'bold',
    padding: hp('1%'),
  }
});

export default ListaAceitos;