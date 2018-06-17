/* eslint-disable react/prefer-stateless-function,global-require,react/jsx-filename-extension,no-mixed-operators,max-len,react/prop-types,no-unused-vars,radix,no-plusplus,one-var,consistent-return,object-curly-newline */
/**
 *
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image, Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');
const thirdWidth = width / 3;
const imageWidth = thirdWidth - 10 * 2;
const imageHeight = imageWidth / 0.697;
const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    width: imageWidth,
    marginRight: 15,
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
  starsWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  stars: {
    width: 10,
    height: 10,
  },
});
const renderStars = (rating) => {
  const { stars, average } = rating;
  if (stars === '00') {
    return;
  }
  const total = 5;
  let full,
    half,
    empty;
  full = parseInt(stars[0]) - 1;
  if (stars[1] === '5') {
    full++;
    half = 0;
    empty = total - full;
  } else {
    half = 1;
    empty = total - full - half;
  }
  const result = [];
  let i;
  for (i = 0; i < full; i++) {
    result.push(<Image
      key={i}
      style={styles.stars}
      source={require('../img/star-full.png')}
    />);
  }
  if (half) {
    result.push(<Image
      key={i}
      style={styles.stars}
      source={require('../img/star-half.png')}
    />);
  }
  for (let j = 0; j < empty; j++) {
    result.push(<Image
      key={i + j + 1}
      style={styles.stars}
      source={require('../img/star-empty.png')}
    />);
  }
  result.push(<Text key="123">{average}</Text>);
  return (
    <View style={styles.starsWrapper}>
      {result}
    </View>
  );
};
const Item = (props) => {
  const { title, image, rating, onPress } = props;
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      {renderStars(rating)}
    </TouchableOpacity>
  );
};

export default Item;
