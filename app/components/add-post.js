import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert, } from 'react-native';
import PostPostsApi from '../api/post-posts-api';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

// Validation for topic to not exceeds 255 characters
const Topic = t.refinement(t.String, function (n) { return n.length <= 255; });

Topic.getValidationErrorMessage = function (value, path, context) {
  return 'Can\'t exceeds more than ' + context.maxLength + ' characters.';
}

// Add post from structure
const User = t.struct({
  title: t.String,
  author: t.String,
  imageURL: t.String,
  topic: Topic,
});

// Optional rendering options
const options = {
  fields: {
    title: {
	  placeholder: 'Title Cute Tiger',
      error: 'Insert a title.',
    },
    author: {
	  placeholder: 'Alex Tan',
      error: 'Insert a author.',
    },
	imageURL: {
	  placeholder: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png',
      error: 'Insert a image url.',
    },
    topic: {
	  placeholder: 'Tiger is cute and gorgeous...',
      error: 'Insert a topic without exceeds 255 characters',
    },
  },
}

export default class PostForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
       value: {
         title: '',
         author: '',
         imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png',
         topic: '',          
       },
    }
  }
  
  handleSubmit() {
    const value = this.form.getValue();
    if (value) {
			// Construct object to post
      const newPost = {};
      newPost.title = value.title;
      newPost.author = value.author;
      newPost.imageURL = value.imageURL;
      newPost.topic = value.topic;
      newPost.timestamp = new Date();
      newPost.points = 0;
			
			// Post to backend via api
			PostPostsApi.postPosts(newPost)
				.then(function (data) {
					if(data.title !== "undefined") {
						var msgContent = "Success added a post with title ("+data.title+").";
						Alert.alert("Congratz", msgContent);
					} else {
						Alert.alert("Server Not Available", "Failed to add post, please try again later.");
					}
				}).catch((error) => {
					 console.log("PostPostsApi call error");
					 console.log(error.message);
				});
				
      // Clear all fields after submit
      this.clearForm();
    }		
  }
  
  onChange(value) {
    this.setState({ value });
  }
	
	clearForm() {
    // clear content from all textbox
    this.setState({ value: null });
  }
	
  render() {
    return (
      <View style={styles.container}>
        <Form 
          ref={c => this.form = c}
          type={User} 
					value={this.state.value}
					onChange={this.onChange.bind(this)}
          options={options}
					context={{maxLength: 5}}
        />
        <Button
          title="Add Post"
          onPress={this.handleSubmit.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffffff',
  },
});
