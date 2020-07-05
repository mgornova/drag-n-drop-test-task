import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { reducer } from './reducer';

export const Store = createStore(reducer, applyMiddleware(logger));
