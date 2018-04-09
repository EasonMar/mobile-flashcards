import { AsyncStorage } from 'react-native';
import { FLASHCARD_STORAGE_KEY, formatDecks } from './initDecks'


export function fetchDecks () {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(formatDecks)
}


