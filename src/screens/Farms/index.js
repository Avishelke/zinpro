import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { THEME_COLOR, px2dp } from "../../helpers/theme";
import Icon from 'react-native-vector-icons/MaterialIcons'
import List from './List';
import Form from './Form';

export default createStackNavigator({
    List: {
        screen: List,
        navigationOptions: ({ navigation }) => ({
            title: 'My Farms',
            headerTitleStyle: { color: 'white', textAlign: 'left' },
            headerStyle: {
                backgroundColor: THEME_COLOR,
            },
            headerRight: <Icon name="add" size={px2dp(20)} color="white" style={{ paddingRight: 15 }} 
                onPress={() => {navigation.push('Form' , {header: 'Create Farm'})}
            } />,
            headerLeft: <Icon name="menu" size={px2dp(24)} color="white" style={{ paddingLeft: 15 }}
                onPress={() => navigation.openDrawer()} />
        }),
    },
    Form: {
        screen: Form,
        navigationOptions: ({ navigation }) => ({
            title:navigation.getParam('header', 'Create Farm'),
            headerStyle: { backgroundColor: THEME_COLOR, color: 'white' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white'
        }),
    }
}, {initialRouteName: 'List'});
