import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import DecksCard from './DecksCard';
import TextButton from './TextButton';
import { purple, white } from '../utils/colors'

class DeckHome extends Component {

	// navigation

	render() {
		return(
			<View style={styles.container}>
				<DecksCard title={'Javascript'} cardNum={2} />
				<View style={styles.buttomArea}>
					<TextButton style={styles.add}>Add card</TextButton>
					<TextButton style={styles.quiz}>Start Quiz</TextButton>
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

export default connect()(DeckHome);