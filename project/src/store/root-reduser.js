import { combineReducers } from 'redux';

import { dataReducer } from './data-reducer';
import { appReducer } from './app-reducer';
import { authReducer } from './auth-reducer';
import { errorReducer } from './error-reducer';
import { formReducer } from './form-reducer';
import { StoreNameSpace } from '../const';


export default combineReducers({
  [StoreNameSpace.DATA]: dataReducer,
  [StoreNameSpace.APP]: appReducer,
  [StoreNameSpace.AUTH]: authReducer,
  [StoreNameSpace.ERROR]: errorReducer,
  [StoreNameSpace.FORM]: formReducer,
});
