import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import QandA from './QandA';
import { red, white, green } from '../utils/colors'

class Exam extends Component {

	state = {
		rotate: new Animated.Value(0),
		zIndex: new Animated.Value(0)
	}

	componentDidMount() {
      Animated.timing(this.state.rotate, {
          toValue: 1,        //属性目标值
          duration: 1500    //动画执行时间
      }).start();    //执行动画

      Animated.timing(this.state.zIndex, {
          toValue: 1,        //属性目标值
          duration: 1500    //动画执行时间
      }).start();    //执行动画
  }

	render() {
		return(
			<Animated.View style={[styles.container,{
				transform: [
					{
						rotateY: this.state.rotate.interpolate({
                inputRange:[0,1],
                outputRange:['0deg','180deg']
            })
					}
				]
			}]}>
				<Animated.View style={[styles.card,styles.answer,{
					zIndex: this.state.zIndex
				}]}>
					<QandA title={'YES'} cont={'Question'} />
					<View style={styles.buttomArea}>
						<TextButton style={styles.cor}>Correct</TextButton>
						<TextButton style={styles.incor}>Incorrect</TextButton>
					</View>
				</Animated.View>
				<View style={styles.card}>
					<QandA title={'Question'} cont={'Answer'} />
					<View style={styles.buttomArea}>
						<TextButton style={styles.cor}>Correct</TextButton>
						<TextButton style={styles.incor}>Incorrect</TextButton>
					</View>
				</View>
			</Animated.View>
		)
	}
}

// 解决Exam高度不为全屏的问题 -- Dimensions.get('window')
const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
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

export default connect()(Exam);