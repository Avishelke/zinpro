import {combineReducers} from 'redux';

import appstate , {APP_STATE} from './app.state';
import messagestate , {MESSAGE_STATE} from './message.state';
import evaluationsstate , {EVALUATIONS_STATE} from './evaluations.state';
import groupsstate , {GROUPS_STATE} from './groups.state';
import assessorstate , {ASSESSORS_STATE} from './assessors.state';
import farmstate , {FARMS_STATE} from './farm.state';

export default combineReducers({
    appstate,
    messagestate,
    evaluationsstate,
    groupsstate,
    assessorstate,
    farmstate
});

export const DEFAULT_APP_STATE= {
    appstate: APP_STATE,
    messagestate: MESSAGE_STATE,
    evaluationsstate: EVALUATIONS_STATE,
    groupsstate: GROUPS_STATE,
    assessorstate: ASSESSORS_STATE,
    farmstate: FARMS_STATE,
}