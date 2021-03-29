import { combineReducers } from 'redux';
import loanApplicationReducer from './loanApplicationReducer';

const rootReducer = combineReducers({
  loan: loanApplicationReducer
});

export default rootReducer;
