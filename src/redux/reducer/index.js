import { combineReducers } from 'redux';
import * as foodReducer from './food';

export default combineReducers(Object.assign(foodReducer))