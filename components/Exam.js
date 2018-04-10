import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import QandA from './QandA';
import { red, white, green, purple } from '../utils/colors';
import { AppLoading } from 'expo';

import { receiveDecks } from '../actions';
import { fetchDecks } from '../utils/api';

class Exam extends Component {

	state = {
		rotate: new Animated.Value(0),
		zIndex: new Animated.Value(0),
		count: 0, // 答题数目
		rightCount: 0, // 成绩
		ready: false,
		finish: false
	}

	showResult(isBack) {
		const configToValue = isBack ? 0 : 100;
		Animated.timing(this.state.rotate, {
          toValue: configToValue, //属性目标值
          duration: 500    				//动画执行时间
      }).start();    							//执行动画

      Animated.timing(this.state.zIndex, {
          toValue: configToValue, //属性目标值
          duration: 500    				//动画执行时间
      }).start();    							//执行动画
	}

	check(_answer) {
		const {count , rightCount} = this.state;
		const {questions} = this.props.card;
		const isRight = _answer === questions[count].answer ? 1 : 0; 

		if(questions.length>count+1){
			this.setState({count: count+1, rightCount: rightCount+isRight})
		}else{
			this.setState({finish: true, rightCount: rightCount+isRight})
		}
	}

	// 这部分在实际中不需要~！
	componentDidMount(){
		const {dispatch} = this.props;
		fetchDecks()
			.then((decks) => dispatch(receiveDecks(decks)))
			.then(() => this.setState(() => ({ready: true})))
	}

	render() {
		// ready这部分在实际中不需要~！
		const { ready, count, finish, rightCount} = this.state;
		
		if(!ready){
			return <AppLoading />
		}

		if(finish){
			return(
				<View style={styles.finishBoard}>
					<Text>Finish</Text>
					<Text style={{marginTop: 30}}>{`Correct rate = ${rightCount*10000/(count+1)/100}%`}</Text>
					<TextButton>Go Back</TextButton>
				</View>
			)
		}

		const { questions } = this.props.card;

		return(
			<View>
				<Text style={styles.progress}>{`Progress : ${count+1}/${questions.length}`}</Text>
				<Animated.View style={[styles.container,
						{transform: [
								{
									rotateY: this.state.rotate.interpolate({
			                inputRange:[0,100],
			                outputRange:['0deg','180deg']
			            })
								}
						]}
					]}
				>
					<Animated.View style={[styles.card,styles.answer,{
						zIndex: this.state.zIndex
					}]}>
						<QandA title={questions[count].answer} cont={'Question'} onPress={() => this.showResult(true)}/>
					</Animated.View>
					<View style={[styles.card,{zIndex: 50}]}>
						<QandA title={questions[count].question} cont={'Answer'} onPress={() => this.showResult()}/>
						<View style={styles.buttomArea}>
							<TextButton style={styles.cor} onPress={()=>this.check('YES')}>Correct</TextButton>
							<TextButton style={styles.incor} onPress={()=>this.check('NO')}>Incorrect</TextButton>
						</View>
					</View>
				</Animated.View>
			</View>
		)
	}
}

// 解决Exam高度不为全屏的问题 -- Dimensions.get('window')
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
	progress: {
		width: '100%',
		textAlign:'center',
		marginTop: 30
	},
	container: {
		height: height,
		transform: [
  		{rotateY: '30deg'}
  	]
	},
	card: {
		backgroundColor: white,
		position: 'absolute',
  	top: 0,
  	bottom: 0,
  	left: 0,
  	right: 0,
  },
  answer: {
  	transform: [
  		{rotateY: '180deg'}
  	]
  },
  buttomArea: {
  	marginBottom: 200,
  	alignItems: 'center'
  },
  finishBoard: {
  	alignItems: 'center',
  	marginTop: 200,
  },
  cor: {
		borderColor: green,
		backgroundColor: green,
		color: white
  },
  incor: {
		borderColor: red,
  	backgroundColor: red,
  	color: white
  }
});

function mapStateToProps (decks) {
	// 需要通过导航传递卡片title,获取对应的问题集
	return {
		card: decks['React']
	}
}

export default connect(mapStateToProps)(Exam);