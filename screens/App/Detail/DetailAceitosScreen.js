import React from 'react';
import { MapView, Marker } from 'expo';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Modal, Alert, AsyncStorage } from 'react-native';
import { LogoTitle } from '../../../components/LogoTitle';
import { DetailItem } from '../../../components/DetailItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import StepIndicator from 'react-native-step-indicator';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Proposal from '../../../http_factory/proposal';

export default class DetailAceitosScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      job: {},
      item: this.props.navigation.state.params.item,
      scrollView: null,
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
      ],
      jobCanceled: false,
      currentPosition: 2,
      stepContainerHeight: '15%',
      labels: ["Contestação", "Saída", "Chegada", "Audiência", "Pagamento"],
      labelSize: 0,
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


  static navigationOptions = {
    header: (
      <LogoTitle />
    )
  };

  render() {
    var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    };
    var innerContainerTransparentStyle =
      { padding: 20 };
    return (
      <View>
        <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <View style={[styles.modalContainer, modalBackgroundStyle]}>
            <View style={innerContainerTransparentStyle}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 100,
                  height: 100,
                  backgroundColor: 'green',
                  borderRadius: 100,
                }}
                onPress={this.setStepDone.bind(this, this.props.navigation.state.params.proposalID)}>
                <Icon name={"ios-checkmark-circle"} size={30} color="#fff" />
                <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center' }}>Concluir essa etapa</Text>
              </TouchableOpacity>
            </View>
            <View style={innerContainerTransparentStyle}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 100,
                  height: 100,
                  backgroundColor: 'red',
                  borderRadius: 100,
                }}
                onPress={this.setStepCancel.bind(this, this.props.navigation.state.params.proposalID)}>
                <Icon name={"ios-close-circle"} size={30} color="#fff" />
                <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center' }}>Cancelar essa etapa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ScrollView
          ref="scrollView"
          style={{ height: "100%" }}>
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
            <DetailItem name={Platform.OS === 'ios' ? 'ios-business' : 'md-business'} title={this.props.navigation.state.params.item.audiencia.forum} />
            <DetailItem name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} title={this.state.date} />
            <DetailItem name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'} title={`R$ ${this.state.item.valor}`}
              description={`R$ ${this.state.item.valor - 50} Serviço + R$ 50,00 Transporte`} />
            <DetailItem name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'} title={`${this.state.distance}${this.state.unit}`}
              description={`${this.state.item.localizacao.rua}, ${this.state.item.localizacao.numero} ${this.state.item.localizacao.regiao}, ${this.state.item.localizacao.cidade}`} />
            <DetailItem name={Platform.OS === 'ios' ? 'ios-briefcase' : 'md-briefcase'} title={this.state.item.usuarioResponsavel.empresa}/>
            <View style={styles.atachedContainer}>
                <Text style={{fontWeight:'bold', color:'#777777'}}>Anexos</Text>
                <TouchableOpacity style={styles.atachedIcon} onPress={()=>{this._downloadDocument()}}>
                  <Icon style={{alignSelf:'center', paddingTop:hp('1%')}} name={"ios-paper"} size={40} color="#fff" />
                  <Text style={{fontWeight:'bold', color:'#ffffff', textAlignVertical:'center', textAlign:'center', paddingLeft:hp('1%')}}>Documento</Text>
                </TouchableOpacity>
            </View>
            <DetailItem name={Platform.OS === 'ios' ? 'ios-alert' : 'md-alert'} title="Resumo da Audiência"
              description={this.state.item.descricao} />
          </View>
          <TouchableOpacity onPress={()=>{this._refuseProposal(this.props.navigation.state.params.proposalID)}}>
            <Text style={styles.recuseButtonText}>Cancelar trabalho</Text>
          </TouchableOpacity>
          <View style={styles.containerJobSteps}>
            <Text style={styles.stepInteractorButtonText}>Clique abaixo para interagir com a etapa em andamento</Text>
            <StepIndicator
              customStyles={this.state.customStyles}
              renderStepIndicator={this.renderStepIndicator}
              currentPosition={parseInt(this.props.navigation.state.params.item.status)}
              labels={this.state.labels}
              onPress={this.stepPressed}
            />
          </View>
        </ScrollView>
      </View>
    );
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

  _refuseProposal = async(proposalID) => {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      await Proposal.refuseProposal(proposalID, userToken)
      this.props.navigation.navigate("Aceitos");
    } catch (error) {
      Alert.alert("Ops!", "Algo de errado do nosso lado. Por favor, repita a ação.");
    }
  } 

  _calculateDistance = async () => {
    const userLatitude = await AsyncStorage.getItem('userLatitude');
    const userLongitude = await AsyncStorage.getItem('userLongitude');

    let distance = ((geolib.getDistance(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: this.props.navigation.state.params.item.localizacao.latitude, longitude: this.props.navigation.state.params.item.localizacao.longitude }
    )) / 1000).toFixed(2);

    if (distance < 1) {
      this.setState({ unit: "m" });
    } else {
      this.setState({ unit: "Km" });
    }

    this.setState({ distance: distance });
  }


  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }


  componentDidMount() {
    this._calculateDistance();
    this._timeConverter();
  }

  setStepDone = async (proposalID) => {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      await Proposal.updateProposal(proposalID, userToken)
    } catch (error) {
      Alert.alert("Ops!", "Algo de errado. Por favor, repita a ação.");
    }
    this.setState({ currentPosition: this.state.currentPosition + 1 });
    this.setModalVisible(false);
  }

  setStepCancel = async (proposalID) => {
    try {
      await Proposal.refuseProposal(proposalID, userToken)
    } catch (error) {
      Alert.alert("Ops!", "Algo de errado. Por favor, repita a ação.");
    }
    this.setState({
      jobCanceled: true,
      customStyles: {
        ...this.state.customStyles,
        stepStrokeCurrentColor: 'red',
        stepIndicatorCurrentColor: 'red',
        currentStepLabelColor: 'red'
      }
    });
    this.setModalVisible(false)
  }

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
  stepPressed = () => {
    if (!this.state.jobCanceled) {
      setTimeout(() => {
        this.refs.scrollView.scrollToEnd();
      }, 50);

      this.setModalVisible(true);

      if (this.state.customStyles.labelSize === 0) {
        this.setState({
          customStyles: {
            ...this.state.customStyles,
            labelSize: hp('1.7%')
          }
        })
      }
      else {
        this.setState({
          customStyles: {
            ...this.state.customStyles,
            labelSize: 0
          }
        })
      }
    }
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
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
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    textDecorationLine: "underline"
  },
  stepInteractorButtonText: {
    color: "#838383",
    alignSelf: "center",
    textAlign: "center",
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    fontSize: hp('1.5%'),
    textDecorationLine: "underline"
  },
  containerJobSteps: {
    backgroundColor: "#fff",
    padding: hp('1%'),
    backgroundColor: '#E8E9ED',
  },
  atachedContainer: {
    marginLeft: wp('10%'),
  },
  atachedIcon: {
    backgroundColor: '#2AA3D8',
    width: wp('35%'),
    height: hp('10%'),
    marginLeft: wp('15%'),
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    borderRadius: 7,
    flexDirection: 'row',
    padding:hp('1%')
  },
});