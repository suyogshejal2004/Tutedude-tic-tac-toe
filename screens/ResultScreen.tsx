import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

const ResultScreen = ({ route, navigation }: Props) => {
  const { winner } = route.params;

  const getResultMessage = () => {
    if (winner === 'Draw') return "It's a Draw! 😐";
    return `${winner} Wins! 🎉`;
  };

  const getImageSource = () => {
    if (winner === 'Draw') return require('../src/0d06fb8d-8ef3-4c45-a7fa-3e908d1b7bb3.jpg');
    return require( '../src/download.jpeg');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.winnerText}>{getResultMessage()}</Text>
      <Image source={getImageSource()} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.buttonText}>Back to Game</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDFEFE' },
  winnerText: { fontSize: 36, fontWeight: 'bold', color: '#27AE60', marginBottom: 30 },
  image: { width: 150, height: 150, marginBottom: 30 },
  button: { backgroundColor: '#2980B9', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18 },
});
