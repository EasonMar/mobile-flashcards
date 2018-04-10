import React from 'react';
import { ScrollView, StatusBar, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Decks from './components/Decks';
import DeckHome from './components/DeckHome';
import Exam from './components/Exam';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import { Constants } from 'expo';
import { setLocalNotification } from './utils/helpers';
import { gray, purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckHome: {
    screen: DeckHome,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      title: 'Card Home'
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      title: 'Add Card'
    }
  },
  Exam: {
    screen: Exam,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      title: 'Examination'
    }
  }
})

export default class App extends React.Component {
	store = createStore(reducer)

	componentDidMount(){
		setLocalNotification()
	}
	render() {
		return (
			<Provider store={this.store}>
				<View style={{flex: 1}}>
					<UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
					<MainNavigator />
				</View>
			</Provider>
    	)
	}
}