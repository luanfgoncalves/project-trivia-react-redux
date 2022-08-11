import { combineReducers } from 'redux';
import player from './login';
import timerReducer from './game';

const rootReducer = combineReducers({ player, timerReducer });

export default rootReducer;
