import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { selectAllGastos } from '../database/database';
import ExpenseItem from '../components/expenseItem';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [gastos, setGastos] = useState([]);
  const [total, setTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const data = selectAllGastos();
      setGastos(data);

      const somaTotal = data.reduce((acumulador, objetoAtual) => acumulador + objetoAtual.valor, 0);
      setTotal(somaTotal);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Acumulado</Text>
        <Text style={styles.summaryValue}>R$ {total.toFixed(2)}</Text>
      </View>

      {gastos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="assignment-late" size={48} color="#BDBDBD" />
          <Text style={styles.emptyText}>Nenhum gasto cadastrado.</Text>
        </View>
      ) : (
        <FlatList
          data={gastos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ExpenseItem item={item} />}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddExpense')}
      >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  summaryCard: {
    backgroundColor: '#FFF',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#E53935',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#757575',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E53935',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#9E9E9E',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    borderRadius: 28,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
});