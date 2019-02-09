import React from 'react';
import { MapView, Marker } from 'expo';
import {  Text, View, ScrollView } from 'react-native';
import { LogoTitle } from '../../../components/LogoTitle';
import { DetailItem } from '../../../components/DetailItem';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class DetailDisponiveisScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      markers: [
          {
              coordinate: {
                  latitude: -23.519812,
                  longitude: -46.660077
              },
              title: "Best Place",
              description: "Description1",
              id: 1
          }
      ]
  };
  }

  static navigationOptions = {
    header: (
      <LogoTitle />
    )
  };

  render() {
    return (
      <ScrollView style={{ height: "100%" }}>
      <Text
      style={{
        backgroundColor: "#2AA3D8",
        textAlign: "center",
        color: "white",
        fontSize:hp('3%'),
        padding:hp('1%'),
        paddingBottom:hp('3%')
      }}>
      {this.props.navigation.state.params.item.rotulo}</Text>
        <View style={{ height: hp('30%') }}>
          <MapView
            ref={MapView => (this.MapView = MapView)}
            style={{ flex: 1 }}
            showsUserLocation={true}
            initialRegion={{
              latitude: -23.519812,
              longitude: -46.660077,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
          {this.state.markers.map((marker, i)  => (  
                  <MapView.Marker
                    key={marker.id}
                    coordinate={marker.coordinate}
                    title={marker.title}
                    description={marker.description}
                  />
                  
          ))}
          </MapView>
        </View>
          <DetailItem />
          <DetailItem />
          <DetailItem />
          <DetailItem />
          <DetailItem />
          <DetailItem />
      </ScrollView>
    );
  }
}
