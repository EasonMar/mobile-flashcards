import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import DecksCard from './DecksCard';
import TextButton from './TextButton';
import { purple, white } from '../utils/colors'

import { AppLoading } from 'expo';
import { receiveDecks } from '../actions';
import { fetchDecks } from '../utils/api';

class DeckHome extends Component {

	// 主要是navigation

	// 这部分在实际中不需要~！
	state = {
		ready: false
	} 
	
	componentDidMount(){
		const {dispatch} = this.props;

		fetchDecks()
			.then((decks) => dispatch(receiveDecks(decks)))
			.then(() => this.setState(() => ({ready: true})))
	} 
	
	render() {
		// ready这部分在实际中不需要~！
		const { ready } = this.state;
		if(!ready){
			return <AppLoading />
		}

		const {card} = this.props;

		return(
			<View style={styles.container}>
				<DecksCard title={card.title} cardNum={card.questions.length} />
				<View style={styles.buttomArea}>
					<TextButton style={styles.add}>Add card</TextButton>
					{
						card.questions.length > 0
						? <TextButton style={styles.quiz}>Start Quiz</TextButton>
						: ''
					}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    marginTop: 150,
    padding: 20
  },
  buttomArea: {
  	marginTop: 100,
  	alignItems: 'center'
  },
  add: {
		borderColor: purple
  },
  quiz: {
		borderColor: purple,
  	backgroundColor: purple,
  	color: white
  }
})

function mapStateToProps (decks) {
	// 需要通过导航传递卡片title,获取对应的问题集
	return {
		card: decks['JavaScript']
	}
}

export default connect(mapStateToProps)(DeckHome);