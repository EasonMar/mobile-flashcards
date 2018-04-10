import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { purple, white, gray } from '../utils/colors';
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api';
import DecksCard from './DecksCard';
import { AppLoading } from 'expo';

class Decks extends Component {
	state = {
    ready: false,
  }

	componentDidMount(){
		const {dispatch} = this.props;

		fetchDecks()
			.then((decks) => dispatch(receiveDecks(decks)))
			.then(() => this.setState(() => ({ready: true})))
	}

	render() {
		const { decks } = this.props;
		const { ready } = this.state;

		if(!ready){
			return <AppLoading />
		}

		return (
			<View style={styles.container}>
					{Object.keys(decks).map(deck=>(
						<TouchableOpacity key={deck} style={styles.item} onPress={console.log('navigation')}>
							<DecksCard title={decks[deck].title} cardNum={decks[deck].questions.length} />
						</TouchableOpacity>
					))}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  item: {
  	height: 100,
	  backgroundColor: '#ddd',
	  borderRadius: 8,
	  marginLeft: 10,
	  marginRight: 10,
	  marginTop: 17,
	}
})

function mapStateToProps(decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(Decks);