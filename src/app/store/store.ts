import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { catalogReducer } from 'src/entities/Product';
import { logoutListenerMiddleware, userReducer } from 'src/features/Auth';
import { cartReducer } from 'src/features/Cart';
import { $api } from 'src/shared/api/api';
import { rtkApi } from 'src/shared/api/rtkApi';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    catalog: catalogReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  },
  devTools: __IS_DEV__,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api,
        },
      },
    })
      .concat(rtkApi.middleware, sagaMiddleware)
      .prepend(logoutListenerMiddleware.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
