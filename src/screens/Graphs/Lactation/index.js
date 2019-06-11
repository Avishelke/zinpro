import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'

import List from './LactationList';
import Info from './Graph';
import { THEME_COLOR, px2dp } from "../../../helpers/theme";

export default createStackNavigator({
    List: {
        screen: List,
        navigationOptions: ({ navigation }) => ({
            title: `Lactation List`,
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
            title: `Info`,
            headerStyle: { backgroundColor: THEME_COLOR },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white'
        }),
    }
}, {
        initialRouteName: 'Info',
        mode: 'modal'
    });
