import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'

import List from './select/List';
import Create from './select/Create';
import { THEME_COLOR, px2dp } from "../../helpers/theme";

export default createStackNavigator({
    List: {
        screen: List,
        navigationOptions: ({ navigation }) => ({
            title: `Select Group`,
            headerStyle: { backgroundColor: THEME_COLOR },
            headerTitleStyle: { color: 'white', textAlign: 'left' },
            headerRight: <Icon name="add" size={px2dp(20)} color="white" style={{ paddingRight: 15 }} 
                onPress={() => {navigation.push('Create' , {header: 'Create Group'})}
            } />,
            headerLeft: <Icon name="arrow-back" size={px2dp(24)} color="white" style={{ paddingLeft: 15 }}
                onPress={() => {
                    navigation.goBack(null)
                }} />
        }),
    },
    Create: {
        screen: Create,
        navigationOptions: ({ navigation }) => ({
            title: `Create Group`,
            headerStyle: { backgroundColor: THEME_COLOR },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white'
        }),
    }
}, {
        initialRouteName: 'List',
        mode: 'modal',
    });
