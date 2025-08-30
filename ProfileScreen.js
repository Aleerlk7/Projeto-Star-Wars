import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFavoriteCharacter, getUserProfile, clearAll } from '../storage/userPrefs';

export default function ProfileScreen({ navigation }) {
  const [character, setCharacter] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      setCharacter(await getFavoriteCharacter());
      setProfile(await getUserProfile());
    };
    const unsub = navigation.addListener('focus', load);
    load();
    return unsub;
  }, [navigation]);

  const changeCharacter = () => {
    navigation.navigate('CharacterSelect');
  };

  const resetApp = async () => {
    await clearAll();
    navigation.reset({ index: 0, routes: [{ name: 'Register' }] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      {profile && (
        <View style={styles.card}>
          <Text style={styles.row}><Text style={styles.label}>Nome:</Text> {profile.name}</Text>
          <Text style={styles.row}><Text style={styles.label}>E-mail:</Text> {profile.email}</Text>
        </View>
      )}

      {character && (
        <View style={styles.card}>
          <Text style={styles.subtitle}>Personagem atual</Text>
          <Text style={styles.big}>{character.name}</Text>
          <TouchableOpacity onPress={changeCharacter} style={styles.btn}>
            <Text style={styles.btnText}>Alterar Personagem</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={resetApp} style={[styles.btn, styles.danger]}>
        <Text style={styles.dangerText}>Apagar dados e reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: { color: '#FFE81F', fontSize: 24, fontWeight: '900', marginBottom: 12 },
  card: { backgroundColor: '#0b0b0b', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#222', marginBottom: 16 },
  row: { color: '#fff', marginBottom: 4 },
  label: { color: '#FFE81F', fontWeight: '800' },
  subtitle: { color: '#bdbdbd' },
  big: { color: '#FFE81F', fontSize: 22, fontWeight: '900', marginVertical: 4 },
  btn: { backgroundColor: '#FFE81F', padding: 14, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#000', fontWeight: '900' },
  danger: { backgroundColor: '#111', borderWidth: 1, borderColor: '#442' },
  dangerText: { color: '#ff6b6b', fontWeight: '800' }
});