import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';

interface BoardProps {
  board: (string | null)[];
  onPress: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onPress }) => (
  <View style={styles.board}>
    {board.map((value, index) => (
      <Cell key={index} value={value} onPress={() => onPress(index)} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  board: {
    width: 310,
    height: 310,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#2C3E50',
    borderRadius: 15,
    padding: 5,
  },
});

export default Board;
//