import React from 'react';
import { MapView, Marker } from 'expo';
import {  Text, View } from 'react-native';

export default class DetailDisponiveisScreen extends React.Component {
  constructor(props) {
    super(props);
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
    title: 'JuridiGo',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  };

  render() {
    return (
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
    );
  }
}
