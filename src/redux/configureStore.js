import rootReducer from './reducers';
import { createStore, compose, applyMiddleware } from 'redux';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger());
}

const enhancer = compose(applyMiddleware(...middlewares));

export function configureStore() {
  const store = createStore(rootReducer, enhancer);
  return store;
}

const store = configureStore();

export default store;
