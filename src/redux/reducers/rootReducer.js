import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';

const rootReducer = combineReducers({
  auth: authenticationReducer
});

export default rootReducer;
