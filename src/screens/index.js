import { createSwitchNavigator } from 'react-navigation';
import Login from './Login';
import Home from './Home';

import React from 'react';

export default ({initialRouteName}) => {

    const RootStackNavigator = createSwitchNavigator({
        Home: Home,
        Login: Login,
    },{
        initialRouteName: initialRouteName
    });

    return <RootStackNavigator/>;
}