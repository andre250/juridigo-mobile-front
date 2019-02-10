import React from 'react';
import { MapView, Marker } from 'expo';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LogoTitle } from '../../../components/LogoTitle';
import { DetailItem } from '../../../components/DetailItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { JobSteps } from '../../../components/JobSteps';
import { Platform } from 'react-native';

const labels = ["Contestação", "Saída", "Chegada", "Audiência", "Pagamento"];
const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  labelSize: 0
}

export default class DetailDisponiveisScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 2,
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
            fontSize: hp('3%'),
            padding: hp('1%'),
            paddingBottom: hp('3%')
          }}>
          {this.props.navigation.state.params.item.rotulo}</Text>
        <View style={{ height: hp('20%') }}>
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
            {this.state.markers.map((marker, i) => (
              <MapView.Marker
                key={marker.id}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
              />
            ))}
          </MapView>
        </View>
        <View>
          <DetailItem name={Platform.OS === 'ios' ? 'ios-business' : 'md-business'} title="Forum Trabalhista da Barra Funda" />
          <DetailItem name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} title="14h - 11/02" />
          <DetailItem name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'} title="R$ 500,00"
            description="R$ 450,00 Serviço + R$ 50,00 Transporte" />
          <DetailItem name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} title="4,3 KM"
            description="Av. Marquês de São Vincente, 235 - Várzea da Barra Funda, São Paulo" />
          <DetailItem name={Platform.OS === 'ios' ? 'ios-briefcase' : 'md-briefcase'} title="JuridiGo"
            description="Empresa de Tecnologia" />
          <DetailItem name={Platform.OS === 'ios' ? 'ios-alert' : 'md-alert'} title="Resumo da Audiência"
            description="Lorem Ipsum" />
        </View>
        <TouchableOpacity style={styles.confirmButtonContainer} onPress={this._confirmJobAsync}>
          <Text style={styles.confirmButtonText}>ACEITAR</Text>
        </TouchableOpacity>
        <Text style={styles.recuseButtonText}>Recusar oferta</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: hp('3%'),
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    flexDirection: 'row',
    alignItems: "center"
  },
  confirmButtonContainer: {
    backgroundColor: '#2AA3D8',
    padding: hp('2%'),
    width: wp('40%'),
    height: hp('7%'),
    alignSelf: "center",
    marginTop: hp('5%'),
    borderRadius: 7,
  },
  confirmButtonText: { 
    color: "white", 
    textAlignVertical: "center", 
    textAlign: "center" 
  },
  recuseButtonText: {
      color: "#838383",
      alignSelf: "center",
      marginTop: hp('5%'),
      marginBottom: hp('5%'),
      textDecorationLine: "underline"
  }
});