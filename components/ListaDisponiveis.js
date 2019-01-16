import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, AsyncStorage } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

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
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.rotulo}`}
              subtitle={item.prazo}
              //avatar={{ uri: item.picture.thumbnail }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => this.nav.navigate('DetailDisponivel')}
            />
          )}
          keyExtractor={item => item.idTrabalho}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>
    );
  }
}

export default ListaDisponiveis;