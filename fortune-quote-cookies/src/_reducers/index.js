import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { quote } from './quoteData.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  quote
});

export default rootReducer;