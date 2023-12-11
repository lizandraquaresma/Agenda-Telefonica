import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  // Função de armazenar dados
  const Armazenar = () => {
    if (!nome || !telefone) {
      Alert.alert('Alerta', 'Por favor, preencha todos os campos.');
      return;
    }
    AsyncStorage.setItem(nome, telefone);
    Alert.alert('Cadastro realizado', 'Numero salvo na agenda');

    // Limpar os campos após a operação
    setNome('');
    setTelefone('');
  };

  // Função de buscar
  const Buscar = async () => {
    const valor = await AsyncStorage.getItem(nome);
    if (valor) {
      Alert.alert('Resultado da busca', `Telefone para ${nome}: ${valor}`);
    } else {
      Alert.alert('Alerta', 'Nome não encontrado.');
    }

    // Limpar os campos após a operação
    setNome('');
    setTelefone('');
  };

  // Função de remover
  const Remover = async () => {
    const valor = await AsyncStorage.getItem(nome);
    if (valor) {
      AsyncStorage.removeItem(nome);
      Alert.alert('Remoção realizada', `Contato removido para ${nome}.`);
    } else {
      Alert.alert('Alerta', 'Nome não encontrado.');
    }

    // Limpar os campos após a operação
    setNome('');
    setTelefone('');
  };

  return (
    <Page>
      <HeaderText></HeaderText>
      <HeaderText>AGENDA DO ALUNO</HeaderText>

      <InputContainer>
        <TextInputStyled
          placeholder="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <TextInputStyled
          placeholder="Número"
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
          keyboardType="numeric"
        />

        <Botao onPress={Armazenar}>
          <Text style={{ color: 'white', fontSize: 23 }}>ARMAZENAR</Text>
        </Botao>

        <Botao onPress={Buscar}>
          <Text style={{ color: 'white', fontSize: 23 }}>BUSCAR</Text>
        </Botao>

        <Botao onPress={Remover} style={{ marginTop: 70}}>
          <Text style={{ color: 'white', fontSize: 23}}>REMOVER</Text>
        </Botao>

      </InputContainer>
    </Page>
  );
}

const Page = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: #F2E3D5;
`;

const HeaderText = styled.Text`
  background-color: lightblue;
  height: 50px;
  width: 100%;
  text-align: center;
  font-size: 30px;

`;

const InputContainer = styled.View`
  margin: 20px;
  flex: 1;
`;

const TextInputStyled = styled.TextInput`
  height: 50px;
  width: 250px;
  background-color: lightgrey;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
`;

const Botao = styled(TouchableOpacity)`
  background-color: lightblue;
  height: 50px;
  width: 250px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;


