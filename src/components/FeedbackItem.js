import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import {DataTable} from 'react-native-paper';

class FeedbackItem extends React.Component {
  static propTypes = {
    feedback: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  onPressItem = item => {
    const email = item.email;
    console.log('onPress email with item: ' + item.email);
    this.props.navigation.navigate('Detail', {item: item});
  };

  handlePress = () => {
    this.props.onPress(this.props.feedback.id);
  };

  render() {
    const {feedback} = this.props;
    console.log(feedback);
    return (
      <View style={styles.container}>
        <DataTable>
          <TouchableOpacity onPress={this.handlePress}>
            <DataTable.Row>
              <DataTable.Cell>{feedback.feedback}</DataTable.Cell>
              <DataTable.Cell>{feedback.id}</DataTable.Cell>
              <DataTable.Cell>{feedback.time}</DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>
        </DataTable>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default FeedbackItem;
