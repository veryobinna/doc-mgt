import { combineReducers } from 'redux';
import login from './LoginReducer';
import signup from './SignupReducer';
import documentReducer from './DocumentReducer';


const rootReducer = combineReducers({
  login,
  signup,
  documentReducer
});

export default rootReducer;
