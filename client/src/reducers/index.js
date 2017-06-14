import { combineReducers } from 'redux';
import login from './LoginReducer';
import signup from './SignupReducer';
import documents from './DocumentReducer';


const rootReducer = combineReducers({
  login,
  signup,
  documents
});

export default rootReducer;
