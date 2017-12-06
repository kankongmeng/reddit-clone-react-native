'use strict';

import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import PostForm from '../app/components/post-form';

describe('PostForm', () => {
  let component;
  let Button;
  const defaultState = {
    value: {
      title: '',
      author: '',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png',
      topic: '',          
    },
  };
    
  test('PostForm view renders correctly', () => {
    const tree = renderer.create(<PostForm />).toJSON()
    expect(tree).toMatchSnapshot();
  });

  beforeEach(() => {
    component = shallow(<PostForm />);
    Button = component.find('Button');
  });

  it('It has default state', () => {
    expect(component.state()).toEqual(defaultState);
  });

  it('It renders button with title', () => {
    const expectedTitle = 'Add Post';
    expect(Button.props().title).toEqual(expectedTitle);
  });

});

