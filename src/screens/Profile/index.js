import { createStackNavigator } from 'react-navigation';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import Profile from './Profile';
import { THEME_COLOR, px2dp } from '../../helpers/theme';
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react';

export default createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
            title: 'Profile',
            headerTitleStyle: { color: 'white', textAlign: 'left' },
            headerStyle: {
                backgroundColor: THEME_COLOR,
            },
            headerLeft: <Icon name="menu" size={px2dp(24)} color="white" style={{ paddingLeft: 15 }}
                onPress={() => navigation.openDrawer()} />

        }),
    },
    ChangePassword: {
        screen: ChangePassword
    },
    EditProfile: {
        screen: EditProfile
    }
}, {
        initialRouteName: 'Profile'
    });
