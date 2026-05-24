import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { insertGasto } from '../database/database';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddExpenseScreen({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('Alimentação'); 
  const [valor, setValor] = useState('');
  
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dataTexto, setDataTexto] = useState(''); 

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    
    if (selectedDate) {
      setDate(selectedDate);
      
      const dia = String(selectedDate.getDate()).padStart(2, '0');
      const mes = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const ano = selectedDate.getFullYear();
      setDataTexto(`${dia}/${mes}/${ano}`);
    }
  };

  const handleSalvar = () => {
    if (!descricao.trim() || !categoria || !valor.trim() || !dataTexto) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const valorNumerico = parseFloat(valor.replace(',', '.'));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'O valor do gasto deve ser maior que zero.');
      return;
    }

    const inseridoComSucesso = insertGasto(descricao, categoria, valorNumerico, dataTexto);

    if (inseridoComSucesso) {
      Alert.alert('Sucesso', 'Gasto armazenado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert('Erro', 'Não foi possível salvar o gasto localmente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição do Gasto *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Almoço no shopping"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Categoria *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={categoria}
          onValueChange={(itemValue) => setCategoria(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Alimentação" value="Alimentação" />
          <Picker.Item label="Transporte" value="Transporte" />
          <Picker.Item label="Lazer" value="Lazer" />
          <Picker.Item label="Estudos" value="Estudos" />
          <Picker.Item label="Contas Domésticas" value="Contas Domésticas" />
          <Picker.Item label="Saúde" value="Saúde" />
        </Picker>
      </View>

      <Text style={styles.label}>Valor (R$) *</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <Text style={styles.label}>Data *</Text>
      <TouchableOpacity 
        style={styles.dateDisplayButton} 
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={dataTexto ? styles.dateText : styles.placeholderText}>
          {dataTexto || "Selecione a data..."}
        </Text>
        <MaterialIcons name="event" size={22} color="#757575" />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()} 
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <MaterialIcons name="save" size={20} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Salvar Gasto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  dateDisplayButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    padding: 14,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  button: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 6,
    marginTop: 35,
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});