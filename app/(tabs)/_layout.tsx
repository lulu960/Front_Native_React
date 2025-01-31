import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // Désactive les onglets en enlevant tabBarStyle
        tabBarStyle: { display: 'none' }, // Cache la barre des onglets
        headerShown: false, // Désactive l'en-tête
      }}
    >
      {/* Aucun écran à ajouter ici si tu ne veux pas de tabs */}
    </Tabs>
  );
}
