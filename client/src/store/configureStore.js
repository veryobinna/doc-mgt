import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';

let middleware;
if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(thunk);
} else {
  middleware = applyMiddleware(logger, thunk);
}
export default initialState => createStore(
    rootReducer,
    initialState,
    middleware
  );
