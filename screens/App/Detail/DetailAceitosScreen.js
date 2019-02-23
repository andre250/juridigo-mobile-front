import React from 'react';
import { MapView, Marker } from 'expo';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import { LogoTitle } from '../../../components/LogoTitle';
import { DetailItem } from '../../../components/DetailItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { JobSteps } from '../../../components/JobSteps';
import { Platform } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import StepIndicator from 'react-native-step-indicator';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'


export default class DetailAceitosScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      scrollView: null,
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
      },
      markers: [
        {
          coordinate: {
            latitude: -23.519812,
            longitude: -46.660077
          },
          title: "Best Place",
          description: "Description1",
          id: 1,
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
    var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    };
    var innerContainerTransparentStyle = 
      {/*backgroundColor: '#fff'*/ padding: 20};
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
                      borderWidth:1,
                      borderColor:'rgba(0,0,0,0.2)',
                      alignItems:'center',
                      justifyContent:'center',
                      width:100,
                      height:100,
                      backgroundColor:'green',
                      borderRadius:100,
                    }}
                    onPress={this.setStepDone.bind(this, false)}>
                  <Icon name={"ios-checkmark-circle"}  size={30} color="#fff" />
                  <Text style={{color:'#fff', textAlign: 'center', justifyContent:'center'}}>Concluir essa etapa</Text>
                </TouchableOpacity>
              </View>
              <View style={innerContainerTransparentStyle}>
                <TouchableOpacity
                  style={{
                      borderWidth:1,
                      borderColor:'rgba(0,0,0,0.2)',
                      alignItems:'center',
                      justifyContent:'center',
                      width:100,
                      height:100,
                      backgroundColor:'red',
                      borderRadius:100,
                    }}
                    onPress={this.setStepCancel.bind(this, false)}>
                  <Icon name={"ios-close-circle"}  size={30} color="#fff" />
                  <Text style={{color:'#fff', textAlign: 'center', justifyContent:'center'}}>Cancelar essa etapa</Text>
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
          <View style={styles.containerJobSteps}>
            <Text style={styles.stepInteractorButtonText}>Clique abaixo para interagir com a etapa em andamento</Text>
            <StepIndicator
                customStyles={this.state.customStyles}
                renderStepIndicator={this.renderStepIndicator}
                currentPosition={this.state.currentPosition}
                labels={this.state.labels}
                onPress={this.stepPressed}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  setStepDone = async (position) => {
    this.setState({currentPosition: this.state.currentPosition + 1});
    this.setModalVisible(false)
  }

  setStepCancel = async (position) => {
    this.setState({jobCanceled:true, 
      customStyles: {
      ...this.state.customStyles,
      stepStrokeCurrentColor: 'red',
      stepIndicatorCurrentColor: 'red',
      currentStepLabelColor: 'red'
    }});
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
  stepPressed = (position) => {
    if (!this.state.jobCanceled){
      setTimeout(() => {
        this.refs.scrollView.scrollToEnd();
      }, 50);

      this.setModalVisible(true);

      if (this.state.customStyles.labelSize === 0){
        this.setState({
        customStyles: {
          ...this.state.customStyles,
          labelSize: hp('1.7%')
        }
      })} 
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
    marginTop: hp('5%'),
    marginBottom: hp('5%'),
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
  }
});