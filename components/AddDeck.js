import React, { Component } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Text } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import TextButton from './TextButton';
import { postDeck } from '../utils/api';
import { trim } from '../utils/helpers';
import { gray, purple, white } from '../utils/colors';

class AddDeck extends Component {
	state = {
		text: ''
	}

	submit() {
		const { decks, dispatch } = this.props;
		const text = trim(this.state.text);

		// verify input
		if(!text){
			alert('Please enter at least a word!');
			return false;
		}

		if(Object.keys(decks).find((el) => (el===text))){
			alert('Deck already exist!');
			return false;
		}

		const deck = {
			title: text,
			questions: []
		}

		// update DB --- done
		postDeck(deck);
		
		// update redux --- done
		dispatch(addDeck(deck))

		// 失焦
		this.refs.addInput.blur();
		this.setState({text: ''});
	}

	render(){
		return(
			<View style={styles.container}>
				<Text>What is the title of your new deck?</Text>
				<TextInput
					style={styles.input}
					placeholder={"Enter deck's name"}
					onChangeText={(text) => this.setState({text})}
        	value={this.state.text}
        	ref="addInput"
				/>
				<TextButton 
					style={styles.submit}
					onPress={()=> this.submit()}
				>Submit</TextButton>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    marginTop: 150,
    padding: 20,
    alignItems: 'center'
  },
  input: {
  	width: '80%',
  	height: 40, 
  	marginTop: 30,
  	borderColor: gray, 
  	borderWidth: 1,
  	borderRadius: 8,
  	paddingRight: 4,
  	paddingLeft: 4,
  },
  submit: {
  	borderColor: purple,
  	backgroundColor: purple,
  	color: white
  }
});

function mapStateToProps (decks) {
	return {
		decks
	}
}

export default connect(mapStateToProps)(AddDeck); 