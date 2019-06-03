import { 
    SHOW_LOADER, HIDE_LOADER,
    NETWORK_CONNECTION_AVAILABLE, NETWORK_CONNECTION_NOT_AVAILABLE,SYNC_AVAILABLE,
    SYNC_FINISH
 } from '../actions';

export const APP_STATE = {
    loader: false,
    network_available: true,
    sync: false
}

export default function reducer(state = APP_STATE, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loader : true };

        case HIDE_LOADER:
            return { ...state, loader : false };
        
        case NETWORK_CONNECTION_AVAILABLE:
            return { ...state, network_available : true };

        case NETWORK_CONNECTION_NOT_AVAILABLE:
            return { ...state, network_available : false };

        case SYNC_AVAILABLE:
            return { ...state, ...{sync : true} };

        case SYNC_FINISH:
            return { ...state, ...{sync : false} };

        default:
            return state;
    }
}