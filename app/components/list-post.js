'use strict';

import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Footer from './footer';
import PostForm from './add-post';
import GetPostsApi from '../api/get-posts-api';

// Maintain a list of topics posts
export default class Posts extends Component {

  constructor(props) {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    super(props);
    this.state = {
      isLoading: true,
      dataSource: ds.cloneWithRows([]),
    }
  }
  
  // Get all posts data from rest API
  getPostData() {
    GetPostsApi.getAllPost()
      .then(function (data) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          isLoading: false,
        })
      }.bind(this));  
  }
	
  componentDidMount() {
    this.getPostData();
  }
  
  // Perform update state when there is new value from Search container
  componentWillReceiveProps(nextProps) {
    if(nextProps.dataSource !== "undefined" && this.state.dataSource != nextProps.dataSource) {
      var tempArr = [];
      tempArr = nextProps.dataSource._dataBlob.s1.slice();
      tempArr.sort((a, b) => b.points - a.points);
      this.setState({
        isLoading: false,
        dataSource: this.state.dataSource.cloneWithRows(tempArr),
      }, function() {
        // In this block you can do something with new state.
      });      
    }
  }
  
  // When user click upvotes
  clickAdd(rowId) {
    var tempArr = [];
    tempArr = this.state.dataSource._dataBlob.s1.slice();
    tempArr[rowId] = {
      id: tempArr[rowId].id,
      title: tempArr[rowId].title,
      author: tempArr[rowId].author,
      imageURL: tempArr[rowId].imageURL,
      topic: tempArr[rowId].topic,
      timestamp: tempArr[rowId].timestamp,
      points: tempArr[rowId].points+=1,
    };
    tempArr.sort((a, b) => b.points - a.points);
    this.setState({dataSource: this.state.dataSource.cloneWithRows(tempArr)});
  }
  
  // When user click downvotes
  clickMinus(rowId) {
    var tempArr = [];
    tempArr = this.state.dataSource._dataBlob.s1.slice();
    tempArr[rowId] = {
      id: tempArr[rowId].id,
      title: tempArr[rowId].title,
      author: tempArr[rowId].author,
      imageURL: tempArr[rowId].imageURL,
      topic: tempArr[rowId].topic,
      timestamp: tempArr[rowId].timestamp,
      points: tempArr[rowId].points-=1,
    };
    tempArr.sort((a, b) => b.points - a.points);
    this.setState({dataSource: this.state.dataSource.cloneWithRows(tempArr)});
  }
  
  // Rendering UI
  render() {
    // When the state is not ready show loading
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 30}}>
          <ActivityIndicator />
        </View>
      );
    }
    
    return (
      <ListView
        dataSource={ this.state.dataSource }
        style={ styles.list}
        renderRow={ (rowData, sectionId, rowId, highlightRow) =>
          <View style={styles.container}>
              <Image style={ styles.postImage } source={{ uri: rowData.imageURL }} />
              <View style={styles.info}>
                <Text style={ styles.title } >#{ ++rowId } { rowData.title }</Text>
                <View style={styles.buttonWrap}>
                  <TouchableOpacity style={ styles.buttonUp } onPress={this.clickAdd.bind(this, --rowId)}>
                    <Text>UpVote</Text>
                  </TouchableOpacity>                        
                  <TouchableOpacity style={ styles.buttonDown } onPress={this.clickMinus.bind(this, rowId)}>
                    <Text>DownVote</Text>
                  </TouchableOpacity>
                </View>
                <Text style={ styles.textContent } > Trending: { rowData.points } </Text>
                <Text style={ styles.textContent } > By: { rowData.author } </Text>
                <Text><Text style={ styles.textContent } > Topic: </Text> { rowData.topic } </Text>
                <Text style={ styles.textContent } > Posted At: { rowData.timestamp } </Text>
              </View>
          </View>
        }
        renderSeparator={ (sectionId, rowId) => <View key={rowId} style={styles.separator} /> }
        renderFooter={ () => <Footer /> }
      />
    );
  }
}

const styles = StyleSheet.create({
    list: {
      marginTop: 20,
    },
    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#8E8E8E',
    },
    buttonUp: {
      alignItems: 'center',
      backgroundColor: '#00FF00',
      padding: 8,
    },
    buttonDown: {
      alignItems: 'center',
      backgroundColor: '#FF4C4C',
      padding: 8,
    },
    buttonWrap: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 10,
      padding: 5,
      backgroundColor: '#FFFFFF'
    },
    postImage: {
        flex: 1,
        height: 100,
        marginTop: 20,
        resizeMode: 'contain'
    },
    iconImage: {
        flex: 1,
        height: 20,
        resizeMode: 'contain'
    },
    info: {
        flex: 3,
        flexDirection: 'column',
        alignSelf: 'center',
        padding: 10
    },
    title: {
        alignSelf: 'center',
        marginBottom: 12,
        fontSize: 16,
        fontWeight: '700',
        color: '#222222'
    },
    textContent: {
        fontWeight: '700'
    }
});
