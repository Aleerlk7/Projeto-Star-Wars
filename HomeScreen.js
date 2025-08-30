import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFavoriteCharacter, getUserProfile } from '../storage/userPrefs';

export default function HomeScreen({ navigation }) {
  const [character, setCharacter] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      const fav = await getFavoriteCharacter();
      const prof = await getUserProfile();
      setCharacter(fav);
      setProfile(prof);
    };
    const unsubscribe = navigation.addListener('focus', load);
    load();
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá {profile?.name || 'Jedi'}</Text>
      {character ? (
        <View style={styles.card}>
          <Text style={styles.subtitle}>Seu personagem favorito:</Text>
          <Text style={styles.big}>{character.name}</Text>
          <Text style={styles.meta}>Altura: {character.height} | Massa: {character.mass}</Text>
          <Text style={styles.meta}>Gênero: {character.gender}</Text>
        </View>
      ) : (
        <Text style={styles.helper}>Nenhum personagem selecionado.</Text>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.btn}>
        <Text style={styles.btnText}>Buscar Personagens</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={[styles.btn, styles.secondary]}>
        <Text style={styles.secondaryText}>Perfil & Preferências</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: { color: '#FFE81F', fontSize: 24, fontWeight: '900', marginBottom: 12 },
  subtitle: { color: '#bdbdbd' },
  big: { color: '#FFE81F', fontSize: 22, fontWeight: '900', marginVertical: 4 },
  meta: { color: '#aaa' },
  helper: { color: '#777' },
  card: { backgroundColor: '#0b0b0b', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#222', marginBottom: 16 },
  btn: { backgroundColor: '#FFE81F', padding: 14, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#000', fontWeight: '900' },
  secondary: { backgroundColor: '#111', borderWidth: 1, borderColor: '#222' },
  secondaryText: { color: '#FFE81F', fontWeight: '800' }
});