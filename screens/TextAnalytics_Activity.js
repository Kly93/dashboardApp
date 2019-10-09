import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';

export default class TextAnalytics_Activity extends Component {
  static navigationOptions = {
    title: 'Text analytics',
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text>text analytics</Text>
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
});
