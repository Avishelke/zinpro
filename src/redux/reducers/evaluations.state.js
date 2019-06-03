import {SELECT_EVALUATION, SELECT_EVALUATION_GROUP} from "../actions"

export const EVALUATIONS_STATE = {
    selectedEvaluation:  null,
    selectedEvaluationGroup:  null
}

export default function reducer(state = EVALUATIONS_STATE, action) {

    switch (action.type) {
        case SELECT_EVALUATION:
            return {...state ,  ...{selectedEvaluation: action.payload}}


        case SELECT_EVALUATION_GROUP:
            return {...state ,  ...{selectedEvaluationGroup: action.payload}}

        default:
            return state;
    }
}