import { combineReducers } from 'redux';

import profile from './profile';
import conversations from './conversations';

export default combineReducers({
  profile,
  conversations,
});
