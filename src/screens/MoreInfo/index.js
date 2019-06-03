import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Info from './Info';
import Syncing from './Syncing';
import { THEME_COLOR, px2dp } from "../../helpers/theme";

export default createStackNavigator({
    Info: {
        screen: Info,
        navigationOptions: ({ navigation }) => ({
            title: `Academy`,
            headerStyle: { backgroundColor: THEME_COLOR },
            headerTitleStyle: { color: 'white', textAlign: 'left' },
            headerLeft: <Icon name="menu" size={px2dp(24)} color="white" style={{ paddingLeft: 15 }}
                onPress={() => navigation.openDrawer()} />
        }),
    },
}, {
        initialRouteName: 'Info',
        mode: 'modal',
    });
