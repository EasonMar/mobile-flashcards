import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { red } from '../utils/colors';

export default function QandA ({title, cont, onPress}) {
	return(
		<View style={styles.center}>
			<Text style={{fontSize: 25,color: red}}>
        {title}
      </Text>
      <TouchableOpacity onPress={onPress}>
	      <Text style={styles.cont}>
	        {cont}
	      </Text>
      </TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    marginTop: 150
  },
  cont: {
  	fontSize: 14, 
  	color: red,
  	marginTop: 50,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid', 
    borderColor: red
  }
})