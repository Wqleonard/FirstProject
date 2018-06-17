/* eslint-disable react/prefer-stateless-function,react/jsx-filename-extension,react/prop-types,react/no-did-mount-set-state,max-len */
import React, { Component } from 'react';
import {
  ActivityIndicator, Image, Text, View,
  StyleSheet,
  AsyncStorage,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from 'react-native';

const api = 'https://api.douban.com/v2/movie/subject';
const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 222,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible', // 是否超出父坐标部分可见
    zIndex: 1, // 层级
  },
  loading: {
    marginTop: 100,
  },
  play: {
    width: 107,
    height: 107,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
export default class Detail extends Component {
    static navigationOptions = ({ navigation }) => ({
      title: navigation.getParam('id', 'A Nested Details Screen'),
    });
    state={
      data: {},
      ready: false,
      videoUri: '',
    }
    async componentDidMount() {
      const { state: { params: { id } } } = this.props.navigation;
      let textData;
      textData = await AsyncStorage.getItem(id);
      // console.log(textData);
      if (textData) {
        //         alert('数据来自本地');
      } else {
        const rowData = await fetch(`${api}/${id}`);
        textData = await rowData.text();
        //         alert('数据来自服务器');
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
      this.fetchVideo(jsonData.mobile_url);
    }
    fetchVideo= async (mobile_url) => {
      let pageHtml = await fetch(mobile_url);
      // 注意,text()需要await
      pageHtml = await pageHtml.text();
      const regex = /href="([\w|\W]*\.mp4)"/;
      const result = pageHtml.match(regex);
      if (result && result[1]) {
        const videoUri = result[1];
        this.setState({
          videoUri,
        });
      }
    }
    playVideo=() => {
      const { videoUri } = this.state;
      if (videoUri) {
        Linking.openURL(videoUri);
      } else {
        alert('正在获取');
      }
    }
    render() {
      const { data: { title, summary, image }, ready } = this.state;
      // const { state, goBack } = this.props.navigation;
      return (
        <View >
          {
            ready ?
              <View>
                <TouchableOpacity onPress={this.playVideo}>
                  <ImageBackground
                    source={{ uri: image }}
                    style={styles.image}
                  >
                    <Image source={require('../img/play-icon.png')} style={styles.play} />
                  </ImageBackground>
                </TouchableOpacity>
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
