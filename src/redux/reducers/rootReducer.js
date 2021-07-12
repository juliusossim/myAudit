import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import projectReducer from './projectReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  auth: authenticationReducer,
  project: projectReducer,
  profile: profileReducer
});

export default rootReducer;
