import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';

function deck(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return action.decks
    case ADD_DECK :
      return {
        ...state,
        action.deck
      }
    case ADD_CARD :
      const {title} = action;
      return {
        ...state,
        [title]:{
          ...state[title],
          questions: [
            ...state[title].questions,
            action.card
          ]
        }
      }
    default:
      return state
  }
}

export default deck;