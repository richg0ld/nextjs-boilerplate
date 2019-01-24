import { combineReducers } from 'redux-immutable';
import {Map} from 'immutable'
import sample, { initialState as sampleState } from './sample';
export const rootInitialState = Map({
    sample: sampleState,
});

export default combineReducers({
    sample,
});