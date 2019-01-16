import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import Wizard from '../components/Wizard';
import Input from '../components/Input';

const forms = [
  {
    placeholder: 'Cadastrais',
    name: 'cadastrais',
  },
  {
    placeholder: 'Curriculares',
    name: 'curriculares',
  },
  {
    placeholder: 'Pagamento',
    name: 'pagamento',
  },
];

export default class FormularioScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.root}>
        <Wizard
          nav={this.props.navigation}
          initialValues={{
            cadastrais: '',
            curriculares: '',
            pagamento: '',
          }}
        >
          {forms.map(el => (
            <Wizard.Step key={el.name}>
              {({ onChangeValue, values }) => (
                <View style={styles.container}>
                  <Input
                    onChangeValue={onChangeValue}
                    placeholder={el.placeholder}
                    value={values[el.name]}
                    name={el.name}
                  />
                </View>
              )}
            </Wizard.Step>
          ))}
        </Wizard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});