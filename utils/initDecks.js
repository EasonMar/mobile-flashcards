import { AsyncStorage } from 'react-native';
export const FLASHCARD_STORAGE_KEY = 'UdaciFlashcard';

function setDummyData () {
	const metaInfo = {
	  React: {
	    title: 'React',
	    questions: [{
	        question: 'React_question_one',
	        answer: 'YES'
	      },{
	        question: 'React_question_two',
	        answer: 'NO'
	      }
	    ]
	  },
	  Redux: {
	    title: 'Redux',
	    questions: []
	  },
	  JavaScript: {
	    title: 'JavaScript',
	    questions: [{
	      question: 'JavaScript_question_one',
	      answer: 'YES'
	    }]
	  },
	  Ruby: {
	    title: 'Ruby',
	    questions: [{
	      question: 'Ruby_question_one',
	      answer: 'YES'
	    }]
	  }
	}

	AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(metaInfo));

	return metaInfo
}

export function formatDecks (result) {
	return result === null
		? setDummyData()
		: JSON.parse(result)
}