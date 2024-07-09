import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer';


/**
 * Define and configure redux store
 */
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
