import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getPeoplePage } from '../services/api';
import { saveFavoriteCharacter } from '../storage/userPrefs';
import CharacterCard from '../components/CharacterCard';

export default function CharacterSelectScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const page1 = await getPeoplePage(1);
        setData(page1);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleConfirm = async () => {
    if (!selected) return;
    await saveFavoriteCharacter(selected);
    navigation.replace('Home');
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu personagem favorito</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <CharacterCard item={item} selected={selected} onPress={() => setSelected(item)} />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search', { mode: 'select' })}
          style={[styles.secondaryButton]}
        >
          <Text style={styles.secondaryText}>Buscar outro personagem</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleConfirm}
          disabled={!selected}
          style={[styles.primaryButton, !selected && styles.disabled]}
        >
          <Text style={styles.primaryText}>{selected ? `Confirmar ${selected.name}` : 'Selecione para continuar'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: { color: '#FFE81F', fontSize: 20, fontWeight: '800', marginBottom: 8 },
  center: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderTopWidth: 1,
    borderTopColor: '#222',
    gap: 8
  },
  primaryButton: { backgroundColor: '#FFE81F', padding: 14, borderRadius: 14, alignItems: 'center' },
  primaryText: { color: '#000', fontWeight: '900' },
  disabled: { opacity: 0.5 },
  secondaryButton: { backgroundColor: '#111', padding: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  secondaryText: { color: '#FFE81F', fontWeight: '700' }
});