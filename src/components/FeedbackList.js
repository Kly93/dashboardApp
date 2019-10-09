import React from 'react';
import {View, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import FeedbackItem from './FeedbackItem';

class FeedbackList extends React.Component {
  static propTypes = {
    feedbacks: PropTypes.array.isRequired,
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.props.feedbacks}
          renderItem={({item}) => (
            <FeedbackItem key={item.id} feedback={item} />
          )}
        />
      </View>
    );
  }
}

export default FeedbackList;
