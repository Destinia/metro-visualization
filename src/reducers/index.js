import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';
import prediction from './prediction';


const rootReducer = combineReducers({
  routing,
  firebase,
  prediction,
});


export default rootReducer;
