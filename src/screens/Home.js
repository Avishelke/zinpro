import { createDrawerNavigator } from 'react-navigation';

import Farms from './Farms';
import Evalutions from './Evalutions';
import Profile from './Profile';
import Drawer from './Drawer';
import Groups from './Groups';
import Assessors from './Assessors';
import MoreInfo from './MoreInfo';
import Graphs from './Graphs';

export default createDrawerNavigator({
    Farms: {
        screen: Farms
    },
    Evalutions: {
        screen: Evalutions
    },
    Groups: {
        screen: Groups
    },
    Assessors: {
        screen: Assessors
    },
    MoreInfo: {
        screen: MoreInfo
    },
    Graphs: {
        screen: Graphs
    },
    Profile: {
        screen: Profile
    },
}, {
        initialRouteName: 'Graphs',
        contentComponent: Drawer,
        drawerWidth: 250
    });
