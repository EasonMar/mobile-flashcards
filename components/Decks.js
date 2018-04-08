import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { purple, white, gray } from '../utils/colors';
import DecksCard from './DecksCard';

class Decks extends Component {

	render() {
		const { decks } = this.props;
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

function mapStateToProps(state) {
	return {
		decks: {
			...state
		}
	}
}

export default connect(mapStateToProps)(Decks);