import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import JobSteps from "./JobSteps";

export class ListaAceitos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      id_usuario: "1",
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
        <View
          style={{
            backgroundColor: "#13438F",
            borderRadius: 7,
          }}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              height: hp('5%'),
            }}>
            {item.rotulo}</Text>
          <View style={{
            backgroundColor: "#fff",
            padding: hp('1%')
          }}>
            <JobSteps />
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              height: hp('5%'),
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
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
  }
});

export default ListaAceitos;