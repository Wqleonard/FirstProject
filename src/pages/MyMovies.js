/* eslint-disable react/prefer-stateless-function,react/jsx-filename-extension,react/prop-types */
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class MyMovies extends Component {
    static navigationOptions = {
      title: '我的电影',
    };
    render() {
      return (
        <View >
          <Text>我的电影</Text>

        </View>
      );
    }
}
