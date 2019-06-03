import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'

import List from './List';
import Form from './Form';
import { THEME_COLOR, px2dp } from "../../helpers/theme";

export default createStackNavigator({
    List: {
        screen: List,
        navigationOptions: ({ navigation }) => ({
            title: `Group List`,
            headerStyle: {backgroundColor : THEME_COLOR},
            headerTitleStyle: { color: 'white', textAlign: 'left' },
            headerRight: <Icon name="add" size={px2dp(20)} color="white" style={{ paddingRight: 15 }} 
                onPress={() => {navigation.push('Form' , {header: 'Create Group'})}
            } />,
            headerLeft: <Icon name="menu" size={px2dp(24)} color="white" style={{ paddingLeft: 15 }}
                onPress={() => navigation.openDrawer()} />
          }),
    },
    Form: {
        screen: Form,
        navigationOptions: ({ navigation }) => ({
            title:navigation.getParam('header', 'Create Group'),
            headerStyle: { backgroundColor: THEME_COLOR, color: 'white' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white'
          })
    }
}, {
        initialRouteName: 'List'
    });
