import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootreducer from './rootreducer';

const persistConfig = {
    key: 'main-root',
    storage: storage
}

const persistedReducer = persistReducer(persistConfig, rootreducer);
const store = configureStore({ reducer: persistedReducer,});

const persister = persistStore(store);
export { persister };
export default store;
