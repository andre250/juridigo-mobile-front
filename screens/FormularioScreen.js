import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LogoTitle } from '../components/LogoTitle';
import Wizard from '../components/Wizard';
import Input from '../components/Input';
import CadastralForm from '../components/Forms/CadastralForm';
import DocumentForm from '../components/Forms/DocumentForm';
import EducationForm from '../components/Forms/EducationForm';
import PaymentForm from '../components/Forms/PaymentForm';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class FormularioScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: (
      <LogoTitle />
    )
  };

  render() {
    return (
      <View style={styles.root}>
          <PaymentForm
            // onChangeValue={onChangeValue}
            // placeholder={el.placeholder}
            // value={values[el.name]}
            // name={el.name}
          />
      </View>
              )
            }
          }

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
});