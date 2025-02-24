// Import necessary modules from redux-persist and redux-toolkit
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit'; 
import userReducer from './index'; 

const persistConfiguration = {
    key: 'auth', 
    storage,   
    whitelist: ['user', 'token']
};

const persistedReducer = persistReducer(persistConfiguration, userReducer);

export const store = configureStore({
    reducer: persistedReducer, 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], 
            },
        }),
});

export const persistor = persistStore(store);
