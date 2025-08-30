import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { searchCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';

export default function SearchScreen({ navigation, route }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const mode = route.params?.mode || 'view';

  const onSearch = async () => {
    const data = await searchCharacters(query);
    setResults(data);
  };

  const onConfirm = () => {
    if (mode === 'select' && selected) {
      navigation.navigate('CharacterSelect', { preselect: selected });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Personagens</Text>
      <View style={styles.searchRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Ex.: Darth Vader"
          placeholderTextColor="#666"
          style={styles.input}
          onSubmitEditing={onSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={onSearch} style={styles.searchBtn}>
          <Text style={styles.searchText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <CharacterCard item={item} selected={selected} onPress={() => setSelected(item)} />
        )}
        ListEmptyComponent={<Text style={styles.helper}>Digite e pesquise um personagem.</Text>}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {mode === 'select' && (
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={onConfirm}
            disabled={!selected}
            style={[styles.primaryButton, !selected && styles.disabled]}
          >
            <Text style={styles.primaryText}>{selected ? `Usar ${selected.name}` : 'Selecione um personagem'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: { color: '#FFE81F', fontSize: 20, fontWeight: '800', marginBottom: 8 },
  searchRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  input: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#222'
  },
  searchBtn: { backgroundColor: '#FFE81F', paddingHorizontal: 16, justifyContent: 'center', borderRadius: 12 },
  searchText: { color: '#000', fontWeight: '900' },
  helper: { color: '#777', textAlign: 'center', marginTop: 24 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.95)',
    borderTopWidth: 1,
    borderTopColor: '#222'
  },
  primaryButton: { backgroundColor: '#FFE81F', padding: 14, borderRadius: 14, alignItems: 'center' },
  primaryText: { color: '#000', fontWeight: '900' },
  disabled: { opacity: 0.5 }
});