/* eslint-disable react/sort-comp,react/no-did-mount-set-state,consistent-return,react/jsx-filename-extension,max-len,react/prop-types,no-unused-vars */
import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import Item from '../components/item';
// import movies from '../movies.json';

const styles = StyleSheet.create({
  row: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  loading: {
    marginTop: 100,
  },
});
const api = 'https://api.douban.com/v2/movie/in_theaters';
export default class List extends Component {
    static navigationOptions = {
      title: '上映',
      // header: null,
    };
    state={
      // movies: movies.subjects,
      movies: [],
      refreshing: false,
      ready: false,
      childState: '',
    }
    refreshing = false;
    start=0;
    count=12;
    async componentDidMount() {
      // setTimeout(() => {
      await this.fetchMore();
      // }, 3000);
      this.setState({
        ready: true,
      });
    }

    fetchData=(start = 0, count = 12) => {
      if (this.refreshing) {
        return;
      }

      this.setState({
        refreshing: true,
      });
      this.refreshing = true;
      return fetch(`${api}?start=${start}$count=${count}`)
        .then(response => response.text())
        .then((responseText) => {
          const json = JSON.parse(responseText);
          this.setState({
            // movies: json.subjects,
            refreshing: false,
          });
          this.refreshing = false;
          return json.subjects;
        })
        .catch((error) => {
          console.error(error);
        });
    }
    freshData=() => {
      this.fetchData().then((json) => {
        this.setState({
          movies: json,
        });
      });
      // or 等效的
      //   const json = await this.fetchData();
      //   this.setState({
      //       movies: json,
      //   });
    }
    fetchMore=async () => {
      const json = await this.fetchData(this.start, this.count);
      if (json) {
        this.start += this.count - 1;
        // 必须重新生成新数组才会认为有变化，用push不行，不会变，使用concat是可以的，会生成新数组
        this.setState({
          movies: [...this.state.movies, ...json],
        });
      }
    }
    render() {
      const {
        movies, refreshing, ready, childState,
      } = this.state;
      const { navigate } = this.props.navigation;
      return (
        <View >
          <Text>详情页传回的值：{childState}</Text>
          {ready ?
            <FlatList
              style={styles.row}
              numColumns={3}
              // columnWrapperStyle={styles.row}
              keyExtractor={item => item.id}
              onRefresh={this.freshData}
              onEndReached={this.fetchMore}
              onEndReachedThreshold={0}
              refreshing={refreshing}
              ListFooterComponent={() => refreshing && <ActivityIndicator size="large" />
              }
              data={movies}
              renderItem={({ item }) =>
                (<Item
                  image={item.images.medium}
                  title={item.title}
                  rating={item.rating}
                  onPress={() => navigate('Detail', {
                    id: item.id,
                    callback: (data) => {
                      this.setState({
                        childState: data,
                      });
                    },
                  })}
                />)}
            />
            : <ActivityIndicator style={styles.loading} size="large" />
          }
        </View>
      );
    }
}
