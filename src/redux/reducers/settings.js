import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import * as actions from '../actions/settings';

const themeReducer = createReducer('dark')
  .handleAction(actions.changeTheme, (state) => (
    state === 'light' ? 'dark' : 'light'
  ));

export default combineReducers({
  theme: themeReducer,
});
