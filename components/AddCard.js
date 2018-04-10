import React, { Component } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Text, Picker, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { addCard, receiveDecks } from '../actions';
import TextButton from './TextButton';
import { postCard } from '../utils/api';
import { trim } from '../utils/helpers';
import { gray, purple, white } from '../utils/colors';

import { fetchDecks } from '../utils/api';

class AddCard extends Component {
	state = {
		question: '',
		answer: 'YES'
	}

	submit() {		
		const { card, dispatch } = this.props;
		// 需要通过导航传递卡片title
		const title = card.title;
		const { answer } = this.state;
		const question = trim(this.state.question);

		// verify input
		if(!question){
			alert('Please enter at least a word!');
			return false;
		}

		if(card.questions.find((el)=> (el.question===question))){
			alert('Question already exist!')
			return false;
		}

		// update DB
		postCard(title, {
			question,
			answer
		})

		// update redux
		dispatch(addCard(title, {
			question,
			answer
		}))
		
		// 失焦
		this.refs.queInput.blur();
		this.setState({question: ''});
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={{fontSize: 20, textAlign: 'center'}}>What is the question of your new Card?</Text>
				<TextInput
					ref="queInput"
					style={styles.input}
					placeholder={"Enter question"}
					onChangeText={(question) => this.setState({question})}
        	value={this.state.question}
				/>
				<Text style={{marginTop: 50, marginBottom: 50}}>What is the answer of your new Card?</Text>
				<Picker
				  selectedValue={this.state.answer}
				  style={styles.picker}
				  onValueChange={(itemValue, itemIndex) => this.setState({answer: itemValue})}>
				  <Picker.Item label="correct" value="YES" />
				  <Picker.Item label="incorrect" value="NO" />
				</Picker>
				<TextButton 
					style={styles.submit}
					onPress={()=> this.submit()}
				>Submit</TextButton>
			</View>
		)
	}
}
const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
	container: {
    flex: 1,
    marginTop: 100,
    padding: 20,
    alignItems: 'center',
    height: height - 200
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
  picker: {
  	flex: 1,
  	height: 10, 
  	width: 100,
  	marginTop: -50
  },
  submit: {
  	borderColor: purple,
  	backgroundColor: purple,
  	color: white
  }
});

function mapStateToProps (decks, { navigation }) {
	// 需要通过导航传递卡片title
	const {title} = navigation.state.params;
	return {
		card: decks[title]
	}
}

export default connect(mapStateToProps)(AddCard); 