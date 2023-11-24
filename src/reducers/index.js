import { combineReducers } from 'redux';
import {reducer as notificationsReducer} from 'reapop';

import errorReducer from './errorReducers';
import authReducer from './authReducers';
import UserReducer from './userReducers';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  user: UserReducer,
});
