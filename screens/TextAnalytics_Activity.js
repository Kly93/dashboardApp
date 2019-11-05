import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import TAappSmileys from '../src/components/TAappsSmileys';

export default class TextAnalytics_Activity extends Component {
  static navigationOptions = {
    title: 'Text analytics',
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.heading}>Average smiley per app</Text>
        <TAappSmileys/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f9',
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    width: 500
  },
});
