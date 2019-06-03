import  { ToastStyles } from 'react-native-toaster'

import {
    SHOW_ERROR_MESSAGE,HIDE_ERROR_MESSAGE,
    SHOW_WARNING_MESSAGE, HIDE_WARNING_MESSAGE,
    SHOW_SUCCESS_MESSAGE, HIDE_SUCCESS_MESSAGE
 } from '../actions';
 import { getValue} from '../../helpers/arrayhelper'


export const MESSAGE_STATE = {
    message: null,
}

export default function reducer(state = MESSAGE_STATE, action) {

    const {error, success, warning} = ToastStyles; 
    const message = getValue(action.payload , ['message']);

    switch (action.type) {
        case SHOW_ERROR_MESSAGE:
            return { ...state, message : { text: message, styles: error, duration: 700 } };

        case SHOW_WARNING_MESSAGE:
            return { ...state, message : { text: message, styles: warning , duration: 700} };

        case SHOW_SUCCESS_MESSAGE:
            return { ...state, message : { text: message, styles: success, duration: 700 } };
        
        case HIDE_WARNING_MESSAGE:
            return { ...state, message : null };

        case HIDE_ERROR_MESSAGE:
            return { ...state, message : null };
        
        case HIDE_SUCCESS_MESSAGE:
            return { ...state, message : null };
        
        default:
            return state;
    }
}