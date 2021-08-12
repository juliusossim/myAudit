import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import projectReducer from './projectReducer';
import profileReducer from './profileReducer';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
  auth: authenticationReducer,
  project: projectReducer,
  home: homeReducer,
  profile: profileReducer
});

export default rootReducer;
