import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import localforage from 'localforage';
import { persistReducer, createMigrate } from 'redux-persist';
import reduxReset from 'redux-reset';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import RootReducer from './reducers/rootReducer';

const migrations = {
  0: (state) => state
};

const persistConfig = {
  key: 'root',
  migrate: createMigrate(migrations),
  stateReconciler: autoMergeLevel2,
  storage: localforage,
  timeout: 0,
  version: 0
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};
export const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware
    ),
    reduxReset()
  )
);

/**
 * Configures the redux store with its appropriate middlewares and sets its
 * initial state.
 *
 * @function
 * @params {Object} initialState - the initial state of the redux store
 * @return {Object} properly configured redux store
 */
export default function configureStore() {
  return {
    ...store
  };
}
