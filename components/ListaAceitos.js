import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet, AsyncStorage } from "react-native";
import { ListItem } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Ionicons"
import { Platform } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Proposal from "../http_factory/proposal";
import DataFormat from "./DataFormat";
import Distance from "./Distance";
import Job from "../http_factory/job";
import { NavigationEvents } from "react-navigation";


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
      currentPosition: 0,
      labels: ["Contestação", "Saída", "Chegada", "Audiência", "Pagamento"],
      customStyles: {
        stepIndicatorSize: 40,
        currentStepIndicatorSize: 60,
        separatorStrokeWidth: 5,
        currentStepStrokeWidth: 5,
        stepStrokeCurrentColor: '#E2D249',
        stepStrokeWidth: 5,
        separatorStrokeFinishedWidth: 5,
        stepStrokeFinishedColor: '#89B63F',
        stepStrokeUnFinishedColor: '#7A7A7A',
        separatorFinishedColor: '#89B63F',
        separatorUnFinishedColor: '#7A7A7A',
        stepIndicatorFinishedColor: '#89B63F',
        stepIndicatorUnFinishedColor: '#7A7A7A',
        stepIndicatorCurrentColor: '#E2D249',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        labelColor: '#333333',
        labelSize: 0,
        currentStepLabelColor: '#E2D249',
      }
    };
  }

  componentDidMount() {
    this.nav = this.props.nav
  }

  async _getUserInfo(job) {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      const jobDetail = await Job.getJobByID(job.idTrabalho, userToken);
      this.nav.navigate('DetailAceitos', {
        proposalID: job["_id"]["$oid"],
        item: jobDetail
      })
    } catch (error) {
      console.log(error)
    }
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

  getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    const iconConfig = {
      name: 'feed',
      color: stepStatus === 'finished' ? '#ffffff' : '#ffffff',
      size: 25,
    }
    switch (position) {
      case 0: {
        iconConfig.name = 'library-books'
        break
      }
      case 1: {
        iconConfig.name = 'transfer-within-a-station'
        break
      }
      case 2: {
        iconConfig.name = 'location-on'
        break
      }
      case 3: {
        iconConfig.name = 'work'
        break
      }
      case 4: {
        iconConfig.name = 'payment'
        break
      }
      default: {
        break
      }
    }
    return iconConfig
  }

  renderStepIndicator = params => (
    <MaterialIcon {...this.getStepIndicatorIconConfig(params)} />
  )

  renderItem = ({ item }) => (
    <ListItem
      roundAvatar
      hideChevron
      title={
        <View style={styles.listItemContainer}>
          <Text style={styles.labelText}>{item.rotulo}</Text>
          <View style={styles.jobStepContainer}>
            <StepIndicator
              customStyles={this.state.customStyles}
              renderStepIndicator={this.renderStepIndicator}
              currentPosition={this.state.currentPosition}
              labels={this.state.labels}
              onPress={() => {
                this._getUserInfo(item)
              }}
            />
          </View>
          <View style={styles.listItemLowerContainer}>
            <View style={styles.infoContainer}>
              <Icon name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"} color="#9F9F9F" size={25} />
              <DataFormat timestamp={item.prazo} />
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
      containerStyle={{ borderBottomWidth: 0, zIndex:1}}
      onPress={() => {
        this._getUserInfo(item)
      }}
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