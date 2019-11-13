import {View, Text} from 'react-native';
import React, {Component} from 'react';

export default class MorePage_Activity extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Admin details</Text>
      </View>
    );
  }
}