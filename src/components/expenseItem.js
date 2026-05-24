import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ExpenseItem({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Text style={styles.valor}>R$ {parseFloat(item.valor).toFixed(2)}</Text>
      </View>
      <View style={styles.footerRow}>
        <View style={styles.metaInfo}>
          <MaterialIcons name="label-outline" size={16} color="#757575" style={styles.icon} />
          <Text style={styles.textInfo}>{item.categoria}</Text>
        </View>
        <View style={styles.metaInfo}>
          <MaterialIcons name="date-range" size={16} color="#757575" style={styles.icon} />
          <Text style={styles.textInfo}>{item.data}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    paddingTop: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53935',
  },
  textInfo: {
    fontSize: 14,
    color: '#757575',
  },
});