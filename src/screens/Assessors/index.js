import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Info from '../MoreInfo/Info'
import Assessor from './List';
import Gilt from './Gilt';
import Gestation from './Gestation';
import Insemination from './Insemination';
import Lactation from './Lactation';
import GiltBreakEven from './GiltBreakEven';
import ClawCollection from './ClawEvaluation';
import FieldSheet from './FieldSheet';
import CullData from './CullData';
import HerdCensus from './HerdCensus';
import Zinpro from './ZinproAcademy'
import { THEME_COLOR, px2dp } from "../../helpers/theme";
import MoreInfo from '../MoreInfo';

export default createStackNavigator({
    Assessor: {
        screen: Assessor,
        navigationOptions: ({ navigation }) => ({
            title: `Assessors`,
            headerStyle: {backgroundColor : THEME_COLOR},
            headerTitleStyle: { color: 'white', textAlign: 'left' },
            headerLeft: <Icon name="menu" size={px2dp(24)} color="white" style={{ paddingLeft: 15 }}
                onPress={() => navigation.openDrawer()} />
          })
    },
    Gilt: {
        screen: Gilt,
        navigationOptions: ({ navigation }) => ({
            title: `Gilt Assessor`,
            headerStyle: {backgroundColor : THEME_COLOR},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white'
          })
    },
    Gestation: {
        screen: Gestation,
        navigationOptions: ({ navigation }) => ({
            title: `Gestation Assessor`,
            headerStyle: {backgroundColor : THEME_COLOR},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white'
          })
    },
    Insemination: {
        screen: Insemination,
        navigationOptions: ({ navigation }) => ({
            title: `Insemination Assessor`,
            headerStyle: {backgroundColor : THEME_COLOR},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white'
          })
    },
    Lactation: {
        screen: Lactation,
        navigationOptions: ({ navigation }) => ({
            title: `Lactation Assessor`,
            headerStyle: {backgroundColor : THEME_COLOR},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white'
          })
    },
    ClawEvaluation: {
        screen: ClawCollection,
        navigationOptions: ({ navigation }) => ({
            title: `Claw Evaluation Sheet`,
            headerStyle: {backgroundColor : THEME_COLOR},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white'
          })
    },
    GiltBreakEven: {
        screen: GiltBreakEven,
        navigationOptions: ({ navigation }) => ({
            title: `Gilt Break Even`,
            headerStyle: {backgroundColor : THEME_COLOR},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white'
          })
    },
    FarmInfo: {
        screen: FieldSheet,
        navigationOptions: ({ navigation }) => ({
            title: `Farm Info`,
          
            headerStyle: {backgroundColor : THEME_COLOR},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white'
          })
    }, HerdProfile: {
        screen: HerdCensus,
        navigationOptions: ({ navigation }) => ({
            title: `Herd Profile`,
            headerStyle: {backgroundColor : THEME_COLOR},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white'
          })
    },
    SowReplacement: {
        screen: CullData,
        navigationOptions: ({ navigation }) => ({
            title: `Sow Replacement`,
            headerStyle: {backgroundColor : THEME_COLOR},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white'
          })
    },
    ZinproAcademy: {
        screen: Info,
        navigationOptions: ({ navigation }) => ({
            title: `Zinpro Academy`,
            headerStyle: {backgroundColor : THEME_COLOR},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white'
          })
    }
}, {
        initialRouteName: 'Assessor'
    });
