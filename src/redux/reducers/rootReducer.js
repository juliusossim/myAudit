import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import engagementReducer from './engagementReducer';
import profileReducer from './profileReducer';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
  auth: authenticationReducer,
  engagement: engagementReducer,
  home: homeReducer,
  profile: profileReducer
});

export default rootReducer;
