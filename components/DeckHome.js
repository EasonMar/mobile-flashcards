import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import DecksCard from './DecksCard';
import TextButton from './TextButton';
import { purple, white } from '../utils/colors'

class DeckHome extends Component {
	
	render() {
		
		const {card,navigation} = this.props;

		return(
			<View style={styles.container}>
				<DecksCard title={card.title} cardNum={card.questions.length} />
				<View style={styles.buttomArea}>
					<TextButton 
						style={styles.add}
						onPress={()=> navigation.navigate(
							'AddCard',
							{ title:card.title }
						)}
					>Add card</TextButton>
					{
						card.questions.length > 0
						? <TextButton 
								style={styles.quiz}
								onPress={() => navigation.navigate(
									'Exam',
									{ title:card.title }
								)}
							>Start Quiz</TextButton>
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

function mapStateToProps (decks, { navigation }) {
	// 需要通过导航传递卡片title,获取对应的问题集
	const {title} = navigation.state.params;
	return {
		card: decks[title]
	}
}

export default connect(mapStateToProps)(DeckHome);