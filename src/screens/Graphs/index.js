import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Assessor from './List';
import Gilt from './Gilt';
import Gestation from './Gestation';
import Insemination from './Insemination';
import Lactation from './Lactation';
import HerdCensus from './HerdCensus';
import GiltBreakEven from './GiltBreakDown';
import CullData from './CullData';
import ClawGraph from './ClawGraph';
import { THEME_COLOR, px2dp } from "../../helpers/theme";

export default createStackNavigator({
    List: {
        screen: Assessor,
        navigationOptions: ({ navigation }) => ({
            title: `Graphs`,
            headerStyle: {backgroundColor : THEME_COLOR,justifyContent:'space-between'},
            headerTitleStyle: { color: 'white',  },
            headerLeft: <Icon name="menu" size={px2dp(24)} color="white" style={{ paddingLeft: 15 }}
                onPress={() => navigation.openDrawer()} />
          })
    },
    Gilt: {
        screen: Gilt,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    Gestation: {
        screen: Gestation,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    Insemination: {
        screen: Insemination,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    Lactation: {
        screen: Lactation,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    HerdProfile: {
        screen: HerdCensus,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    SowReplacement: {
        screen: CullData,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    GiltBreakEven: {
        screen: GiltBreakEven,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    ClawGraph: {
        screen: ClawGraph,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    }
}, {
        initialRouteName: 'List'
    });
