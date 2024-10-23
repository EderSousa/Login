import { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'

import { styles } from './styles';

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function verificaAutentificacao() {
    const compativel = await LocalAuthentication.hasHardwareAsync();
    console.log(compativel);

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(types.map(type => LocalAuthentication.AuthenticationType[type])); //verificar qual tipo de desbloqueio possui
  }

  async function handleAuthentication() {
    const isBiometric = await LocalAuthentication.isEnrolledAsync();
    //console.log(isBiometric); verificando boimetria

    if (!isBiometric){
      return Alert.alert('login', 'Nenhuma biometria encontrada.')
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Biometria não reconhecida'
    });

    setIsAuthenticated(auth.success);

  }

  useEffect(() => {
    verificaAutentificacao();
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        Usúario conectado: { isAuthenticated ? 'Sim' : 'Não' }
      </Text>

      <Button 
        title='Entrar' 
        onPress={handleAuthentication}
      />
      
    </View>
  );
}

