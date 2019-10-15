import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ajax from '../ajax';
import FeedbackList from '../src/components/FeedbackList';

export default class FeedbackList_Activity extends React.Component {
  static navigationOptions = {
    title: 'Feedback results',
  };

  state = {
    feedbacks: [],
    currentFeedbackId: null,
  };

  async componentDidMount() {
    const feedbacks = await ajax.getAllFeedbacks();
    console.log(feedbacks);
    this.setState({feedbacks});
  }

  render() {
    const feedbacksToDisplay = this.state.feedbacks;
    if (feedbacksToDisplay.length > 0) {
      return (
        <View style={styles.container}>
          <FeedbackList feedbacks={feedbacksToDisplay} />
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
  },
});
