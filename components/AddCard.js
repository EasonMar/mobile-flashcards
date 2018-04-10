import React, { Component } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Text, Picker, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { addCard, receiveDecks } from '../actions';
import TextButton from './TextButton';
import { postCard } from '../utils/api';
import { trim } from '../utils/helper';
import { gray, purple, white } from '../utils/colors';

import { fetchDecks } from '../utils/api';

class AddCard extends Component {
	state = {
		question: '',
		answer: 'YES'
	}

	submit() {
		// 需要通过导航传递卡片title
		const title = 'React';
		
		const { card, dispatch } = this.props;
		const { answer } = this.state;
		const question = trim(this.state.question);

		// verify input
		if(!question){
			alert('Please enter at least a word!');
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
		
		// navigation
	}

	// 这部分在实际中不需要~！
	componentDidMount(){
		const {dispatch} = this.props;

		fetchDecks()
			.then((decks) => dispatch(receiveDecks(decks)))
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={{fontSize: 20, textAlign: 'center'}}>What is the question of your new Card?</Text>
				<TextInput
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

				<Text style={{marginTop:20}}>{JSON.stringify(this.props.card)}</Text>
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

function mapStateToProps (decks) {
	// 需要通过导航传递卡片title
	return {
		card: decks['React']
	}
}

export default connect(mapStateToProps)(AddCard); 