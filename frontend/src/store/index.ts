import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import tasksReducer from '../features/tasks/tasksSlice';
<<<<<<< HEAD
=======
import profileReducer from '../features/profile/profileSlice';
>>>>>>> frontend/profile

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
<<<<<<< HEAD
=======
    profile: profileReducer,
>>>>>>> frontend/profile
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
