import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, AsyncStorage, Text } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
      refreshing: false
    };
  }

  componentDidMount() {
    this.nav = this.props.nav
    this._makeRemoteRequestAsync();
  }

  _makeRemoteRequestAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // const { id_usuario } = this.state;
    const url = `https://private-599c2-juridigo.apiary-mock.com/trabalhos/:id/propostas?usuario=${userToken}`;
    
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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderItem = ({ item }) => (
    <ListItem
      roundAvatar
      hideChevron
      title={
      <View
        style={{
          backgroundColor: "#2AA3D8",
          borderRadius:7,
        }}>
      <Text
      style={{
        color: "white",
        textAlign:"center",
        height:hp('5%'),
      }}>
      {item.rotulo}</Text> 
      <View
        style={{
          backgroundColor: "#fff",
          height:hp('7%'),
          flexDirection: 'row'
        }}>
        <Text
        style={{
          color: "#A1A1A1",
          marginLeft: wp('5%')
        }}>
        14h - 11/02</Text>

        <Text
        style={{
          color: "#A1A1A1",
          marginLeft: wp('5%')
        }}>
        R$ 500,00</Text>

        <Text
        style={{
          color: "#A1A1A1",
          marginLeft: wp('5%')
        }}>
        4,3 KM</Text>
      </View>
    </View>}
      //title={`${item.rotulo}`}
      // subtitle={item.prazo}
      //avatar={{ uri: item.picture.thumbnail }}
      containerStyle={{ borderBottomWidth: 0 }}
      onPress={() => this.nav.navigate('DetailDisponivel',{
        item: item
    })}
    />
  );
  
  renderHeader = () => {
    return <SearchBar placeholder="Busque aqui..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <View style={{
          backgroundColor: "#E8E9ED",
          height:"100%",
          justifyContent: 'center',
        }}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.idTrabalho}
          // ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
        </View>
      </List>
    );
  }
}


export default ListaDisponiveis;