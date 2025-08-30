import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function CharacterCard({ item, selected, onPress }) {
  const isSelected = selected?.name === item.name;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, isSelected && styles.selected]}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.meta}>Altura: {item.height} | Massa: {item.mass}</Text>
        <Text style={styles.meta}>Gênero: {item.gender}</Text>
      </View>
      {isSelected && <Text style={styles.badge}>SELECIONADO</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0b0b0b',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#222'
  },
  selected: {
    borderColor: '#FFE81F',
    shadowColor: '#FFE81F',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8
  },
  name: { color: '#FFE81F', fontSize: 18, fontWeight: '700', marginBottom: 4 },
  meta: { color: '#aaa' },
  badge: { color: '#000', backgroundColor: '#FFE81F', alignSelf: 'flex-start', paddingHorizontal: 8, borderRadius: 999, marginTop: 8 }
});