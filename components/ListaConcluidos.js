import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Ionicons"
import { Platform } from 'react-native';
import JobSteps from "./JobSteps";
import RatingStar from "./RatingStar";
import { NavigationEvents } from "react-navigation";

export class ListaConcluidos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      id_usuario: "1",
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.nav = this.props.nav
  }

  makeRemoteRequest = () => {
    const { page, seed, id_usuario } = this.state;
    const url = `https://private-599c2-juridigo.apiary-mock.com/trabalhos/:id/propostas?usuario=${id_usuario}`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderItem = ({ item }) => (
    <ListItem
      roundAvatar
      hideChevron
      title={
        <View style={styles.listItemContainer}>
          <View style={styles.listItemUpperContainer}>
            <Text style={styles.labelText}>{item.rotulo}</Text>
            <RatingStar name={Platform.OS === "ios" ? "ios-star" : "md-star"} color="yellow" size={hp('7%')} rating={5} />
          </View>
          <View style={styles.jobStepContainer}>
            <JobSteps />
          </View>
          <View style={styles.listItemLowerContainer}>
            <View style={styles.infoContainer}>
              <Icon name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"} color="#9F9F9F" size={25} />
              <Text style={styles.infoLabel}>14h - 11/02</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon name={Platform.OS === "ios" ? "ios-wallet" : "md-wallet"} color="#9F9F9F" size={25} />
              <Text style={styles.infoLabel}>R$ 500,00</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon name={Platform.OS === "ios" ? "ios-pin" : "md-pin"} color="#9F9F9F" size={25} />
              <Text style={styles.infoLabel}>4,3 KM</Text>
            </View>
          </View>
        </View>}
      containerStyle={{ borderBottomWidth: 0 }}
    /*onPress={() => this.nav.navigate('DetailDisponivel', {
      item: item
    })}*/
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => {
            this.makeRemoteRequest();
            }}/>
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
    textAlign: "left",
    height: hp('5%'),
    fontWeight: 'bold',
    fontSize: hp("2%"),
    alignSelf: "center",
    paddingLeft: wp("5%"),
    textAlignVertical: "center",
    width:'80%'
  },
  listItemContainer: {
    backgroundColor: "#3D3D3D",
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
  listItemUpperContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default ListaConcluidos;