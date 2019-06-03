import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Info from './Graph';
import List from './GiltList';
import { THEME_COLOR, px2dp } from "../../../helpers/theme";

export default createStackNavigator({
    List: {
        screen: List,
        navigationOptions: ({ navigation }) => ({
            title: `Gilt BreakDown  Data List`,
            headerStyle: { backgroundColor: THEME_COLOR },
            headerTitleStyle: { color: 'white', textAlign: 'left' },
            headerLeft: <Icon name="arrow-back" size={px2dp(24)} color="white" style={{ paddingLeft: 15 }}
                onPress={() => {
                    navigation.goBack(null)
                }} />
        }),
    },
    Info: {
        screen: Info,
        navigationOptions: ({ navigation }) => ({
            title: `Info & Graph`,
            headerStyle: { backgroundColor: THEME_COLOR },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white'
        }),
    }
}, {
        initialRouteName: 'List',
        mode: 'modal'
    });
