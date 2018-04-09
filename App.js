import React from 'react';
import { ScrollView } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Decks from './components/Decks';
import DeckHome from './components/DeckHome';
import Exam from './components/Exam';
import QandA from './components/QandA';

export default class App extends React.Component {
	store = createStore(reducer)
	render() {
		return (
			<Provider store={this.store}>
				<ScrollView style={{flex: 1}}>
					<Decks />
				</ScrollView>
			</Provider>
    	)
	}
}