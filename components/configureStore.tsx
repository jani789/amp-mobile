import * as localforage from 'localforage';

import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { applyMiddleware, createStore } from 'redux';

// import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { useEffect } from 'react';

const config = () => {
  const persistConfig: PersistConfig<any> = {
    key: 'root',
    version: 1,
    storage: localforage,
    blacklist: [],
  };
  const logger = (createLogger as any)();
  const history = typeof window !== 'undefined' && createBrowserHistory();

  const dev = process.env.NODE_ENV === 'development';

  const middleware = dev
    ? applyMiddleware(thunk, logger)
    : applyMiddleware(thunk);

  // if (dev) {
  //   middleware = composeWithDevTools(middleware);
  // }

  const persistedReducer = persistReducer(persistConfig, rootReducer(history));
  const store = createStore(persistedReducer, {}, middleware) as any;
  const persistor = persistStore(store);
  return { store, persistor };
};
export default config;
// export { history };
