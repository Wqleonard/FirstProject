/* eslint-disable react/prefer-stateless-function,react/jsx-filename-extension,react/prop-types */
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Cinemas extends Component {
    static navigationOptions = {
      title: '影院',
    };
    render() {
      return (
        <View >
          <Text>影院页</Text>

        </View>
      );
    }
}
