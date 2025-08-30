import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterScreen from './src/screens/RegisterScreen';
import CharacterSelectScreen from './src/screens/CharacterSelectScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000',
    card: '#000',
    text: '#FFE81F', // Star Wars yellow
    primary: '#FFE81F',
    border: '#222'
  },
};

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');
        const favoriteCharacter = await AsyncStorage.getItem('favoriteCharacter');
        if (!hasOnboarded) {
          setInitialRoute('Register');
        } else if (!favoriteCharacter) {
          setInitialRoute('CharacterSelect');
        } else {
          setInitialRoute('Home');
        }
      } catch (e) {
        setInitialRoute('Register');
      }
    };
    bootstrap();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTitleStyle: { color: '#FFE81F' },
          headerTintColor: '#FFE81F'
        }}
      >
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro' }} />
        <Stack.Screen name="CharacterSelect" component={CharacterSelectScreen} options={{ title: 'Escolha seu Personagem' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Buscar Personagens' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}