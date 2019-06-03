import {SELECT_FARM} from "../actions"

export const FARMS_STATE = {
    selectedFarm:  null
}

export default function reducer(state = FARMS_STATE, action) {

    switch (action.type) {
        case SELECT_FARM:
            return {...state ,  ...{selectedFarm: action.payload}}

        default:
            return state;
    }
}