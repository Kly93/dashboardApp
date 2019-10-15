import React from 'react';
import {View, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import FeedbackItem from './FeedbackItem';
import {DataTable} from 'react-native-paper';

class FeedbackList extends React.Component {
  static propTypes = {
    feedbacks: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Feedback</DataTable.Title>
            <DataTable.Title>OS</DataTable.Title>
            <DataTable.Title>Date</DataTable.Title>
          </DataTable.Header>
        </DataTable>
        <FlatList
          data={this.props.feedbacks}
          renderItem={({item}) => (
            <FeedbackItem
              key={item.id}
              feedback={item}
              onPress={this.props.onItemPress}
            />
          )}
        />
      </View>
    );
  }
}

export default FeedbackList;
