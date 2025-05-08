import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  currentPlayer: 'X' | 'O';
}

const Header: React.FC<HeaderProps> = ({ currentPlayer }) => (
  <View style={styles.header}>
    <Text style={styles.title}>Tic Tac Toe</Text>
    <Text style={styles.turn}>
      Current Turn: <Text style={styles.current}>{currentPlayer}</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  header: { alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 34, fontWeight: 'bold', color: '#2C3E50' },
  turn: { fontSize: 20, color: '#34495E' },
  current: { color: '#E74C3C', fontWeight: 'bold' },
});

export default Header;
//