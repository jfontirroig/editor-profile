import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';

import logger from 'redux-logger'

const initialState = {};
const middleware = [thunk];
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware, sagaMiddleware, logger)));
