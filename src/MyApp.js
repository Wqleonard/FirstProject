/* eslint-disable react/prefer-stateless-function,global-require,react/jsx-filename-extension */
/**
 *
 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Item from './components/item';


const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
export default class MyApp extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Item />
        <Item />
        <Item />
      </View>
    );
  }
}
