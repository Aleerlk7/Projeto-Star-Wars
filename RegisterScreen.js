import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { saveUserProfile } from '../storage/userPrefs';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const canContinue = name.trim().length > 1 && email.includes('@');

  const handleRegister = async () => {
    if (!canContinue) return;
    await saveUserProfile({ name: name.trim(), email: email.trim() });
    navigation.replace('CharacterSelect');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <Text style={styles.title}>Bem-vindo Padawan</Text>
      <Text style={styles.subtitle}>Crie seu perfil para iniciar sua jornada.</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          placeholder="Luke Skywalker"
          placeholderTextColor="#555"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="luke@rebellion.org"
          placeholderTextColor="#555"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TouchableOpacity
          disabled={!canContinue}
          onPress={handleRegister}
          style={[styles.button, !canContinue && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 24, justifyContent: 'center' },
  title: { color: '#FFE81F', fontSize: 28, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: '#bdbdbd', textAlign: 'center', marginBottom: 24 },
  form: { gap: 12 },
  label: { color: '#FFE81F', marginTop: 8 },
  input: {
    backgroundColor: '#0b0b0b',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#222'
  },
  button: {
    backgroundColor: '#FFE81F',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center'
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#000', fontWeight: '800' }
});