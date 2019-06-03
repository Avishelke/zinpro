import { createStore, applyMiddleware } from "redux";
import reduxArray from "redux-array";

import rootReducer, { DEFAULT_APP_STATE } from "./reducers";


export const store = createStore(rootReducer, DEFAULT_APP_STATE, applyMiddleware(reduxArray));
