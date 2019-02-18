import React from 'react';
import { MapView, Marker } from 'expo';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { LogoTitle } from '../../../components/LogoTitle';
import { DetailItem } from '../../../components/DetailItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';

export default class DetailDisponiveisScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      unit: "",
      distance: 0,
      item: this.props.navigation.state.params.item,
      currentPosition: 2,
      user: {
        latitude: parseFloat(this.props.navigation.state.params.localizacao.uLat),
        longitude: parseFloat(this.props.navigation.state.params.localizacao.uLong),
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      },
      markers: [
        {
          coordinate: {
            latitude: this.props.navigation.state.params.item.localizacao.latitude,
            longitude: this.props.navigation.state.params.item.localizacao.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          },
          title: "Localização",
          description: "Forum",
          id: 1
        }
      ]
    };
  }

  componentDidMount() {
    this._calculateDistance();
    this._timeConverter();
  }

  _calculateDistance = async () => {

    let distance = ((geolib.getDistance(
      { latitude: this.props.navigation.state.params.localizacao.uLat, longitude: this.props.navigation.state.params.localizacao.uLong },
      { latitude: this.props.navigation.state.params.item.localizacao.latitude, longitude: this.props.navigation.state.params.item.localizacao.longitude }
    )) / 1000).toFixed(2);

    if (distance < 1) {
      this.setState({ unit: "m" });
    } else {
      this.setState({ unit: "Km" });
    }

    this.setState({ distance: distance });
  }

  _timeConverter = async () => {
    const a = new Date(this.props.navigation.state.params.item.prazo * 1000);
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const time = `${hour}h - ${date}/${month}`
    this.setState({ date: time })
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
            showsUserLocation={false}
            initialRegion={this.state.markers[0].coordinate}
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
          <DetailItem name={Platform.OS === 'ios' ? 'ios-business' : 'md-business'} title={this.state.item.rotulo} />
          <DetailItem name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} title={this.state.date} />
          <DetailItem name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'} title={`R$ ${this.state.item.valor}`}
            description={`R$ ${this.state.item.valor - 50} Serviço + R$ 50,00 Transporte`} />
          <DetailItem name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} style={styles.Text} title={`${this.state.distance}${this.state.unit}`}
            description={`${this.state.item.localizacao.rua}, ${this.state.item.localizacao.numero} ${this.state.item.localizacao.regiao}, ${this.state.item.localizacao.cidade}`} />
          <DetailItem name={Platform.OS === 'ios' ? 'ios-briefcase' : 'md-briefcase'} title={this.state.item.usuarioResponsavel.empresa}/>
          <DetailItem name={Platform.OS === 'ios' ? 'ios-alert' : 'md-alert'} title="Resumo da Audiência"
            description={this.state.item.descricao} />
        </View>
        <TouchableOpacity style={styles.confirmButtonContainer} onPress={this._confirmJobAsync}>
          <Text style={styles.confirmButtonText}>ACEITAR</Text>
        </TouchableOpacity>
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
  },
  Text: {
    color: "#9F9F9F",
    fontWeight: 'bold',
    flexDirection: 'row',
    padding: hp('1%'),
    alignItems: 'center',
    textAlign: 'center'
  }
});