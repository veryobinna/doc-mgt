import { combineReducers } from 'redux';
import login from './LoginReducer';
import signup from './SignupReducer';


const rootReducer = combineReducers({
  login,
  signup
});

export default rootReducer;
