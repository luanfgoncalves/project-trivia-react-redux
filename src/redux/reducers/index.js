import { combineReducers } from 'redux';
import user from './login';
import timerReducer from './game';

const rootReducer = combineReducers({ user, timerReducer });

export default rootReducer;
