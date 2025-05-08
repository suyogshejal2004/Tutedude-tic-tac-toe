import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CellProps {
  value: string | null;
  onPress: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onPress }) => (
  <TouchableOpacity
    style={[styles.cell, value === 'X' ? styles.xCell : value === 'O' ? styles.oCell : null]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={styles.cellText}>{value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cell: {
    width: '33.33%',
    height: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BDC3C7',
    backgroundColor: '#ECF0F1',
  },
  xCell: {
    backgroundColor: '#FADBD8',
  },
  oCell: {
    backgroundColor: '#D6EAF8',
  },
  cellText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
});

export default Cell;
//