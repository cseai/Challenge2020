import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alertReducer';
import config from './configReducer';
import eduhub from './eduHubReducer';
// import test from './testReducer';
import dept from './deptReducer';
import library from './libraryReducer';
export default combineReducers({ alert, auth, config, eduhub, dept, library });
