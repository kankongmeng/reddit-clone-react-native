'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    ListView,
    TextInput,
    View
} from 'react-native';
import { bind } from '../utils/utils';
import { withNavigationFocus } from '@patwoz/react-navigation-is-focused-hoc';
import GetPostsApi from '../api/get-posts-api';
import Posts from '../components/list-post';

// Main container, parent component of list-post
class Search extends Component {
  
  constructor(props) {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    super(props);
    this.state = {
      text: '',
      dataSource: ds.cloneWithRows([])
    }

    bind(this)('searchInputOnChange', 'getAllPostsAndUpdateData');
  }
  
  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    focusedRouteKey: PropTypes.string.isRequired,
  }
  
  componentDidMount() {
    this.getAllPostsAndUpdateData();
  }
  
  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      // screen enter (refresh data, update ui ...)
      this.getAllPostsAndUpdateData();
    }
  }
    
  getAllPostsAndUpdateData() {
    GetPostsApi.getAllPost()
      .then(function (data) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          isLoading: false
        })
      }.bind(this));
  }
    
  searchInputOnChange(text) {
    if (text.length < 1) {
      this.getAllPostsAndUpdateData();
      this.setState({
        text
      });
    }
    
    GetPostsApi.searchPostByTitle(text)
      .then(function (res) {
        this.setState({
          text,
          dataSource: this.state.dataSource.cloneWithRows(res)
        })
      }.bind(this));
  }
  
  render() {
    return (
      <View style = { styles.container } >
        <TextInput
          style = { styles.searchInput }
          placeholder="Search..."
          autoCorrect = { false }
          clearTextOnFocus = { true }
          value = { this.state.text }
          onChangeText = { this.searchInputOnChange } />
        <Posts dataSource = { this.state.dataSource } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 50,
    marginTop: 10,
    padding: 10,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
  }
});

export default withNavigationFocus(Search);
