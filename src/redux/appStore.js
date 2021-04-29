import { persistStore } from 'redux-persist';
import rootReducer from './reducers/rootReducer';
import configureStore from './store';

const store = configureStore({
  rootReducer
});
const persistor = persistStore(store);
const appStore = { persistor, store };

export default appStore;
