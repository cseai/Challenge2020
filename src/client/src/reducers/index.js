import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alertReducer';
import config from './configReducer';
import eduhub from './eduHubReducer';
export default combineReducers({ alert, auth, config, eduhub });
