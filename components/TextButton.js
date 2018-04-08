import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple,
    padding: 10,
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'solid', 
  },
  btn: {
    marginTop: 30,
    width: 150
  }
})