import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, ViewStyle, TextStyle } from 'react-native';
import auth from '@react-native-firebase/auth';

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Basic email validation
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle Sign-Up
  const handleSignUp = async (): Promise<void> => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', `User ${userCredential.user.email} signed up successfully!`);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/weak-password':
          setError('Password is too weak');
          break;
        default:
          setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign-In
  const handleSignIn = async (): Promise<void> => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', `Welcome back, ${userCredential.user.email}!`);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No user found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        default:
          setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentication</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Sign Up" onPress={handleSignUp} disabled={loading} />
          <Button title="Sign In" onPress={handleSignIn} disabled={loading} />
        </View>
      )}
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  input: ViewStyle;
  error: TextStyle;
  buttonContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AuthScreen;