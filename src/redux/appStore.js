import { persistStore } from 'redux-persist';
import configureStore from './store';

const store = configureStore({});
const persistor = persistStore(store);

const appStore = { persistor, store };

export default appStore;
