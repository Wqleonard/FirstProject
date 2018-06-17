/* eslint-disable react/prefer-stateless-function,react/jsx-filename-extension,react/prop-types,react/no-did-mount-set-state,max-len */
import React, { Component } from 'react';
import {
  ActivityIndicator, Image, Text, View,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

const api = 'https://api.douban.com/v2/movie/subject';
const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 222,
  },
  loading: {
    marginTop: 100,
  },
});
export default class Detail extends Component {
    static navigationOptions = ({ navigation }) => ({
      title: navigation.getParam('id', 'A Nested Details Screen'),
    });
    state={
      data: {},
      ready: false,
    }
    async componentDidMount() {
      const { state: { params: { id } } } = this.props.navigation;
      let textData;
      textData = await AsyncStorage.getItem(id);
      console.log(textData);
      if (textData) {
        alert('数据来自本地');
      } else {
        const rowData = await fetch(`${api}/${id}`);
        textData = await rowData.text();
        alert('数据来自服务器');
      }

      // 反序列化 "死"的字符串=>"活"的对象
      const jsonData = JSON.parse(textData);
      jsonData.image = jsonData.images.large.replace('webp', 'jpg');
      // 序列化 "活"的对象=>"死"的字符串
      // const textData = JSON.stringify(jsonData);
      AsyncStorage.setItem(id, textData);
      this.setState({
        data: jsonData,
        ready: true,
      });
    }
    render() {
      const { data: { title, summary, image }, ready } = this.state;
      // const { state, goBack } = this.props.navigation;
      return (
        <View >
          {
            ready ?
              <View>
                <Image source={{ uri: image }} style={styles.image} />
                <Text>{title}</Text>
                <Text>{summary}</Text>
              </View>
              :
              <ActivityIndicator size="large" style={styles.loading} />
          }
        </View>
      );
    }
}
