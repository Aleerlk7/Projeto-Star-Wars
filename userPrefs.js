import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveUserProfile(profile) {
  await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
  await AsyncStorage.setItem('hasOnboarded', 'true');
}

export async function getUserProfile() {
  const raw = await AsyncStorage.getItem('userProfile');
  return raw ? JSON.parse(raw) : null;
}

export async function saveFavoriteCharacter(character) {
  await AsyncStorage.setItem('favoriteCharacter', JSON.stringify(character));
}

export async function getFavoriteCharacter() {
  const raw = await AsyncStorage.getItem('favoriteCharacter');
  return raw ? JSON.parse(raw) : null;
}

export async function clearAll() {
  await AsyncStorage.multiRemove(['userProfile','favoriteCharacter','hasOnboarded']);
}