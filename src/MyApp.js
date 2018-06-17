/* eslint-disable react/prefer-stateless-function,global-require,react/jsx-filename-extension,no-unused-vars,max-len,no-shadow,consistent-return,react/sort-comp,react/no-did-mount-set-state */
/**
 *
 */
import { StackNavigator, TabNavigator } from 'react-navigation';
import List from './pages/List';
import Detail from './pages/Detail';
import Cinemas from './pages/Cinemas';
import MyMovies from './pages/MyMovies';


const MyTab = TabNavigator({
  List: { screen: List },
  Cinemas: { screen: Cinemas },
  MyMovies: { screen: MyMovies },
}, {
  tabBarOptions: {
    activateTintColor: '#390EB',
    inactivateTintColor: '#fff',
    labelStyle: {
      fontSize: 20,
      marginBottom: 15,
    },
    style: {
      backgroundColor: '#222',
    },
  },
});
const MyApp = StackNavigator({
  MyTab: { screen: MyTab, navigationOptions: { header: null } },
  Detail: { screen: Detail },
}, {
  headerMode: 'screen',
});
export default MyApp;
