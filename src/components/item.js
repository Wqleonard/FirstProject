/* eslint-disable react/prefer-stateless-function,global-require,react/jsx-filename-extension,no-mixed-operators */
/**
 *
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image, Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const thirdWidth = width / 3;
const imageWidth = thirdWidth - 10 * 2;
const imageHeight = imageWidth / 0.697;
const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    width: imageWidth,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
});
export default class Item extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Image
          source={require('../img/poster.jpg')}
          style={styles.image}
        />
        <Text style={styles.title}>金刚狼3:殊死一战</Text>
      </View>
    );
  }
}
