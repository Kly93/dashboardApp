import {View, StyleSheet, Text} from 'react-native';
import React, {Component} from 'react';
import TAappSmileys from '../src/components/TAappsSmileys';
import {ScrollView} from 'react-native-gesture-handler';
import TACatDistr from '../src/components/TACatDistr';

export default class TextAnalytics_Activity extends Component {
  static navigationOptions = {
    title: 'Text analytics',
  };

  render() {
    return (
      <View>
        <ScrollView>
          <View>
            <Text style={styles.text}>Average smiley per app</Text>
            <TAappSmileys />
          </View>
          <View>
            <Text style={styles.text}>Category distribution</Text>
            <TACatDistr />
          </View>
        </ScrollView>
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
    padding: 11,
  },
  text: {
    fontSize: 24,
    padding: 10,
    fontWeight: 'bold',
  },
});