import React from 'react';
import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import FeedbackItem from './FeedbackItem';
import {DataTable} from 'react-native-paper';

class FeedbackList extends React.Component {
  static propTypes = {
    feedbacks: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onListRefresh: PropTypes.bool.isRequired,
    onPullDownRefresh: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Os</DataTable.Title>
            <DataTable.Title>Feedback</DataTable.Title>
            <DataTable.Title
              style={{flexDirection: 'row', justifyContent: 'center'}}>
              Date
            </DataTable.Title>
          </DataTable.Header>
        </DataTable>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.props.feedbacks}
          renderItem={({item}) => (
            <FeedbackItem
              key={item.id}
              feedback={item}
              onPress={this.props.onItemPress}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.props.onListRefresh}
              onRefresh={this.props.onPullDownRefresh}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5,
    elevation: 10,
  },
});

export default FeedbackList;
