import React, { Component } from "react";
import { View, FlatList, StyleSheet, AsyncStorage, Text, ActivityIndicator } from "react-native";
import { ListItem } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from 'react-native';
import Proposal from '../http_factory/proposal';


export class ListaDisponiveis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      id_usuario: null,
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      location: null,
    };
  }

  componentDidMount() {
    this.nav = this.props.nav
    this._makeRemoteRequestAsync();
  }

  _makeRemoteRequestAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({ loading: true });
    try {
      const data = await Proposal.getFreeProposal(userToken);
      this.setState({
        data: data,
        loading: false,
        refreshing: false
      })
    } catch (error) {
      this.setState({
        loading: false
      })
    }

  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this._makeRemoteRequestAsync();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this._makeRemoteRequestAsync();
      }
    );
  };

  renderItem = ({ item }) => (
    <ListItem
      roundAvatar
      hideChevron
      title={
        <View style={styles.listItemContainer}>
          <Text style={styles.labelText}> {item.rotulo}</Text>
          <View style={styles.listItemLowerContainer}>
            <View style={styles.infoContainer}>
              <Icon name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"} color="#9F9F9F" size={25} />
              <Text style={styles.infoLabel}>14h - 11/02</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon name={Platform.OS === "ios" ? "ios-wallet" : "md-wallet"} color="#9F9F9F" size={25} />
              <Text style={styles.infoLabel}>R$ {item.valor}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon name={Platform.OS === "ios" ? "ios-pin" : "md-pin"} color="#9F9F9F" size={25} />
              <Text style={styles.infoLabel}>KM</Text>
            </View>
          </View>
        </View>}
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={() => this.nav.navigate('DetailDisponivel', {
        item: item
      })}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        {this.state.refreshing == false
          ? <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item["_id"]["$oid"]}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={50}
          />
          : <View style={styles.container}>
            <Text style={styles.Text}>Buscando propostas próximas a você...</Text>
            <ActivityIndicator size="large" color="#13438F" />
          </View>
        }
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
    backgroundColor: "#2AA3D8",
    borderRadius: 7,
  },
  listItemLowerContainer: {
    backgroundColor: "#fff",
    height: hp('7%'),
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
  },
  Text:{
    color: "#9F9F9F",
    fontWeight: 'bold',
    flexDirection: 'row',
    padding: hp('1%'),
    alignItems: 'center',
    textAlign: 'center'
  }
});

export default ListaDisponiveis;