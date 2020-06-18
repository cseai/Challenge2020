import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alertReducer';
import config from './configReducer';
export default combineReducers({ alert, auth, config });
