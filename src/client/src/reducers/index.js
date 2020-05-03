import { combineReducers } from 'redux';
import auth from './authReducer';
import config from './configReducer';
export default combineReducers({ auth, config });
