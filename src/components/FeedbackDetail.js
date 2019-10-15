import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import ajax from '../../ajax';

class FeedbackDetail extends React.Component {
  static propTypes = {
    feedback: PropTypes.object.isRequired,
  };
  state = {
    feedback: this.props.initialFeedbackData,
  };

  async componentDidMount() {
    const fullFeedback = await ajax.getFeedbackDetail(this.state.feedback.id);
    this.setState({
      FeedbackDetail: fullFeedback,
    });
  }

  render() {
    const {feedback} = this.state;
    return (
      <View>
        <Text>{feedback.feedback}</Text>
        <Text>{feedback.app}</Text>
        <Text>{feedback.category}</Text>
      </View>
    );
  }
}

export default FeedbackDetail;
