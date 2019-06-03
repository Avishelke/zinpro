import {SELECT_GROUP} from "../actions"

export const GROUPS_STATE = {
    selectedGroup: null
}

export default function reducer(state = GROUPS_STATE, action) {

    switch (action.type) {

        case SELECT_GROUP:
            return {...state ,  ...{selectedGroup: action.payload}}

        default:
            return state;
    }
}