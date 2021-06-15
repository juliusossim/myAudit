import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import projectReducer from './projectReducer';

const rootReducer = combineReducers({
  auth: authenticationReducer,
  project: projectReducer
});

export default rootReducer;
