import { combineReducers } from 'redux';
import auth from './LoginReducer';
import documentReducer from './DocumentReducer';
import usersReducer from './UsersReducer';

const rootReducer = combineReducers({
  auth,
  documentReducer,
  usersReducer
});

export default rootReducer;
