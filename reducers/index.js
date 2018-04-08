import { ADD_DECK, ADD_CARD } from '../actions';

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


function deck(state = metaInfo, action) {
  switch (action.type) {
    case ADD_DECK :
      return state
    case ADD_CARD :
      return state
    default:
      return state
  }
}

export default deck;