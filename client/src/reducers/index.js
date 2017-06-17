import { combineReducers } from 'redux';
import login from './LoginReducer';
import signup from './SignupReducer';
import documentReducer from './DocumentReducer';
import usersReducer from './UsersReducer';

const rootReducer = combineReducers({
  login,
  signup,
  documentReducer,
  usersReducer
});

export default rootReducer;
