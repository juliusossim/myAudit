import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import engagementReducer from './engagementReducer';
import profileReducer from './profileReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  auth: authenticationReducer,
  engagement: engagementReducer,
  users: usersReducer,
  profile: profileReducer
});

export default rootReducer;
