import { AsyncStorage } from 'react-native';
import { FLASHCARD_STORAGE_KEY, formatDecks } from './initDecks'


export function fetchDecks () {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then(formatDecks)
}

export function postDeck (deck) {
	return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
		[deck.title]: deck
	}))
}

export function postCard (title, question) {
	return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
					.then((results) => {
						const decks = JSON.parse(results);
						decks[title].questions.push(question);
						AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks))
					})
}