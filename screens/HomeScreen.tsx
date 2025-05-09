import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { RootStackParamList } from '../navigation/AppNavigator';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert('Logged Out', 'You have been successfully logged out');
      navigation.replace('Login'); // or navigation.navigate('Login')
    } catch (error: any) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Tic Tac Toe</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.buttonText}>▶️ Start Game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDFEFE' },
  title: { fontSize: 40, fontWeight: 'bold', color: '#2C3E50', marginBottom: 30 },
  button: { backgroundColor: '#3498DB', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  logoutButton: { marginTop: 20, backgroundColor: '#E74C3C', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 10 },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
