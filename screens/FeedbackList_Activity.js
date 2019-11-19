import React, {Component} from 'react';
import {View, BackHandler, StyleSheet} from 'react-native';
import ajax from '../ajax';
import FeedbackList from '../src/components/FeedbackList';
import FeedbackDetail from '../src/components/FeedbackDetail';
import ChooseApp from '../src/components/ChooseApp';

export default class FeedbackList_Activity extends React.Component {

  static navigationOptions = {
    title: 'Feedback results',
  };

  state = {
    feedbacks: [],
    currentFeedbackId: null,
    loading: false,
    refreshing: false,
    isFeedbackClick: false,
  };

  setCurrentFeedback = feadbackId => {
    this.setState({
      currentFeedbackId: feadbackId,
    });
  };

  currentFeedback = () => {
    return this.state.feedbacks.find(
      feedback => feedback.id === this.state.currentFeedbackId,
    );
  };

  unsetCurrentFeedback = () => {
    this.setState({
      currentFeedbackId: null,
    });
    return true;
  };

  _getFeedbackData = async () => {
    const _feedbacks = await ajax.getAllFeedbacks();
    this.setState({feedbacks: _feedbacks});
  };

  handleNewFeedbackBold = () => {};

  handleRefresh = () => {
    this.setState({refreshing: true});
    this._getFeedbackData().then(() => {
      this.setState({refreshing: false});
    });
  };

  componentDidMount() {
    this._getFeedbackData();
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.unsetCurrentFeedback,
    );
  }

  render() {
    if (this.state.currentFeedbackId) {
      return (
        <View>
          <FeedbackDetail initialFeedbackData={this.currentFeedback()} />
        </View>
      );
    }
    const feedbacksToDisplay = this.state.feedbacks;
    if (feedbacksToDisplay.length > 0) {
      return (
        <View style={styles.mainContainer}>
          <ChooseApp style={{flex: 1}}/>
          <FeedbackList
            style={{flex: 1}}
            feedbacks={feedbacksToDisplay}
            onItemPress={this.setCurrentFeedback}
            onListRefresh={this.state.refreshing}
            onPullDownRefresh={this.handleRefresh.bind(this)}
          />
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    height: '100%',
    paddingBottom: 10,
  },
});