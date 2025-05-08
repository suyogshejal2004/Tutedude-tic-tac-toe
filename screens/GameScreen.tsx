import React, { useState } from 'react';
import { SafeAreaView, StyleSheet,  } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import Header from '../components/Header';
import Board from '../components/Board';

const GameScreen = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (index: number) => {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      navigation.navigate('Result', { winner });
    } else if (!newBoard.includes(null)) {
      navigation.navigate('Result', { winner: 'Draw' });
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (b: (string | null)[]) => {
    const winCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b1, c] of winCombos) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header currentPlayer={currentPlayer} />
      <Board board={board} onPress={handlePress} />
    </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#FDFEFE', alignItems: 'center', justifyContent: 'center',
  },
});
