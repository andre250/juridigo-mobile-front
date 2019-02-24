import { createStackNavigator } from 'react-navigation';
import FormCadastral from '../components/Forms/FormCadastral';
import FormDocumento from '../components/Forms/FormDocumento';
import FormEscolaridade from '../components/Forms/FormEscolaridade';
import FormPagamento from '../components/Forms/FormPagamento';
import CameraScreen from '../screens/CameraScreen';
import TermosUso from '../screens/Terms/TermosUso';
import React from 'react';
import { TextTitle } from '../components/TextTitle';
import TermosResponsabilidade from '../screens/Terms/TermosResponsabilidade';

const FormStack = createStackNavigator({
  // Cadastral: FormCadastral,
  // Documento: FormDocumento,
  // Escolaridade: FormEscolaridade,
  Pagamento: FormPagamento,
  Camera: CameraScreen,
  TermosUso: TermosUso,
  TermosResponsabilidade: TermosResponsabilidade
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
  {
    initialRouteName: 'Cadastral',
  });

FormStack.navigationOptions = {
  header: (
    <TextTitle title='DADOS CADASTRAIS' showIcon={false} />
  )
};

export default FormStack;