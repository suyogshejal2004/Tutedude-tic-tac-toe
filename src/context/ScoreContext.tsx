import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Score {
  X: number;
  O: number;
}

interface ScoreContextType {
  score: Score;
  incrementScore: (player: 'X' | 'O') => void;
  clearScore: () => void;
}

export const ScoreContext = createContext<ScoreContextType>({
  score: { X: 0, O: 0 },
  incrementScore: () => {},
  clearScore: () => {},
});

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState<Score>({ X: 0, O: 0 });

  useEffect(() => {
    const loadScore = async () => {
      const storedScore = await AsyncStorage.getItem('score');
      if (storedScore) {
        setScore(JSON.parse(storedScore));
      }
    };
    loadScore();
  }, []);

  const incrementScore = async (player: 'X' | 'O') => {
    const updatedScore = { ...score, [player]: score[player] + 1 };
    setScore(updatedScore);
    await AsyncStorage.setItem('score', JSON.stringify(updatedScore));
  };

  const clearScore = async () => {
    const reset = { X: 0, O: 0 };
    setScore(reset);
    await AsyncStorage.setItem('score', JSON.stringify(reset));
  };

  return (
    <ScoreContext.Provider value={{ score, incrementScore, clearScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
