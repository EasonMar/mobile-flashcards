import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { gray } from '../utils/colors';

export default function DecksCard ({title, cardNum}) {
	return(
		<View style={styles.center}>
			<Text style={{fontSize: 20}}>
        {title}
      </Text>
      <Text style={{fontSize: 16, color: gray}}>
        {cardNum} cards
      </Text>
		</View>
	)
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})